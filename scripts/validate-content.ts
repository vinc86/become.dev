/**
 * validate-content.ts — validazione deterministica dei contenuti become.dev
 *
 * Uso: npx tsx scripts/validate-content.ts <module-id> [lesson-id]
 * Exit 0 = nessun errore (i warning non bloccano); exit 1 = errori (report su stderr).
 *
 * Gira in Phase 2.5 della pipeline, PRIMA di qualunque review LLM:
 * i reviewer non devono mai ricevere contenuto che fallisce qui.
 *
 * Severità:
 * - error: problemi di correttezza (schema invalido, code block che non compila,
 *   PREDICT con output dichiarato sbagliato, forward reference malformato,
 *   frontmatter incoerente). Bloccano la Phase 3.
 * - warn:  standard di contenuto non ancora riflessi nei tipi condivisi o di
 *   natura stilistica (hints mancanti, em dash, paragrafi oltre 5 frasi).
 *   Riportati ma non bloccanti; è materia per la review LLM.
 */

import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import vm from "node:vm";
import matter from "gray-matter";
import * as ts from "typescript";
import { z } from "zod";

// ---------------------------------------------------------------------------
// 1. Schemi zod — rispecchiano types/exercise.ts e types/quiz.ts (EPIC-11).
//    Tenuti manualmente in sync: se cambi i tipi, cambia anche qui.
//    `hints` è richiesto dal PLAN §4.4: 1–2 per esercizio, obbligatori.
// ---------------------------------------------------------------------------

const Hints = z.array(z.string().min(10)).min(1).max(2);

const inRange = { message: "correctIndex fuori range rispetto a options" };

const PredictExercise = z
  .object({
    type: z.literal("PREDICT"),
    question: z.string().min(10),
    code: z.string().min(1),
    options: z.array(z.string()).min(3).max(5),
    correctIndex: z.number().int().nonnegative(),
    hints: Hints,
    explanation: z.string().min(20)
  })
  .refine((e) => e.correctIndex < e.options.length, inRange);

const OrderExercise = z
  .object({
    type: z.literal("ORDER"),
    question: z.string().min(10),
    // Nel contenuto reale gli ORDER concettuali non hanno code (types/exercise.ts
    // lo richiede: da allineare rendendolo opzionale anche lì).
    code: z.string().min(1).optional(),
    items: z.array(z.string()).min(3),
    correctOrder: z.array(z.number().int().nonnegative()),
    hints: Hints,
    explanation: z.string().min(20)
  })
  .refine(
    (e) => {
      const sorted = [...e.correctOrder].sort((a, b) => a - b);
      return (
        e.correctOrder.length === e.items.length &&
        sorted.every((v, i) => v === i) // permutazione valida di 0..n-1
      );
    },
    { message: "correctOrder non è una permutazione valida degli items" }
  );

const IdentifyExercise = z
  .object({
    type: z.literal("IDENTIFY"),
    question: z.string().min(10),
    code: z.string().min(1),
    options: z.array(z.string()).min(3).max(5),
    correctIndex: z.number().int().nonnegative(),
    hints: Hints,
    explanation: z.string().min(20)
  })
  .refine((e) => e.correctIndex < e.options.length, inRange);

const ClassifyExercise = z
  .object({
    type: z.literal("CLASSIFY"),
    question: z.string().min(10),
    items: z.array(z.object({ label: z.string().min(1), category: z.string().min(1) })).min(3),
    categories: z.array(z.string().min(1)).min(2),
    hints: Hints,
    explanation: z.string().min(20)
  })
  .refine((e) => e.items.every((it) => e.categories.includes(it.category)), {
    message: "ogni item.category deve appartenere a categories"
  })
  .refine((e) => e.categories.every((c) => e.items.some((it) => it.category === c)), {
    message: "ogni categoria deve avere almeno un item"
  });

const FixExercise = z
  .object({
    type: z.literal("FIX"),
    question: z.string().min(10),
    buggyCode: z.string().min(1),
    options: z.array(z.string()).min(3).max(5),
    correctIndex: z.number().int().nonnegative(),
    hints: Hints,
    explanation: z.string().min(20)
  })
  .refine((e) => e.correctIndex < e.options.length, inRange);

const ImplementExercise = z
  .object({
    type: z.literal("IMPLEMENT"),
    question: z.string().min(10),
    setup: z.string().min(20),
    starterCode: z.string().min(1),
    tests: z.array(z.object({ description: z.string().min(1), expectation: z.string().min(1) })).min(2),
    solutionCode: z.string().min(1),
    hints: Hints,
    explanation: z.string().min(20)
  })
  .refine((e) => e.starterCode.trim() !== e.solutionCode.trim(), {
    message: "starterCode identico a solutionCode"
  });

const Exercise = z.discriminatedUnion("type", [
  PredictExercise,
  OrderExercise,
  IdentifyExercise,
  ClassifyExercise,
  FixExercise,
  ImplementExercise
]);

const QuizQuestion = z
  .object({
    type: z.enum(["MCQ", "SCENARIO"]),
    setup: z.string().optional(), // obbligatorio se SCENARIO — vedi refine sotto
    question: z.string().min(10),
    options: z.array(z.string()).min(3).max(5),
    correctIndex: z.number().int().nonnegative(),
    explanation: z.string().min(20)
  })
  .refine((q) => q.type !== "SCENARIO" || (q.setup?.length ?? 0) > 20, {
    message: "SCENARIO richiede un setup"
  })
  .refine((q) => q.correctIndex < q.options.length, inRange);

const Frontmatter = z.object({
  lessonId: z.string().min(1),
  title: z.string().min(1),
  sectionCount: z.number().int().positive(),
  freePreview: z.boolean().optional()
});

// ---------------------------------------------------------------------------
// 2. Compilazione: ogni blocco di codice TS/JS deve passare il type-check.
//    TS: diagnostica semantica completa (Program in-memory con lib ES2023+DOM),
//    filtrando i codici attesi nei frammenti didattici (nomi non dichiarati,
//    import non risolvibili, top-level await): le lezioni mostrano spezzoni,
//    non moduli autosufficienti. JS: solo diagnostica sintattica — il check
//    semantico strict su JS didattico produce falsi positivi.
// ---------------------------------------------------------------------------

const TS_LANGS = ["ts", "tsx", "typescript"];
const JS_LANGS = ["js", "jsx", "javascript"];

// Codici tollerati nei frammenti: 2304/2552 Cannot find name, 2307 Cannot find
// module, 2580/2591 Node globals, 2582-2585 lib mancante, 2593 test globals,
// 2792 module resolution, 7016 declaration file, 1375/1378 top-level await.
const FRAGMENT_OK = new Set([1375, 1378, 2304, 2307, 2552, 2580, 2582, 2583, 2584, 2585, 2591, 2593, 2792, 7016]);

const compilerOptions: ts.CompilerOptions = {
  strict: true,
  target: ts.ScriptTarget.ES2022,
  lib: ["lib.es2023.d.ts", "lib.dom.d.ts", "lib.dom.iterable.d.ts"],
  module: ts.ModuleKind.ESNext,
  noEmit: true,
  skipLibCheck: true
};

const tsLibDir = dirname(ts.sys.getExecutingFilePath());
const libCache = new Map<string, ts.SourceFile | undefined>();

function getLibFile(name: string, languageVersion: ts.ScriptTarget): ts.SourceFile | undefined {
  if (!libCache.has(name)) {
    const text = ts.sys.readFile(join(tsLibDir, name));
    libCache.set(name, text === undefined ? undefined : ts.createSourceFile(name, text, languageVersion));
  }
  return libCache.get(name);
}

function extractCodeBlocks(mdx: string): { lang: string; meta: string; code: string; line: number }[] {
  const blocks: { lang: string; meta: string; code: string; line: number }[] = [];
  const re = /```(\w+)?([^\n]*)\n([\s\S]*?)```/g;
  for (let m = re.exec(mdx); m; m = re.exec(mdx)) {
    blocks.push({
      lang: (m[1] ?? "").toLowerCase(),
      meta: (m[2] ?? "").trim(), // info string dopo il lang, es. "no-check"
      code: m[3],
      line: mdx.slice(0, m.index).split("\n").length
    });
  }
  return blocks;
}

function typecheck(code: string, fileName: string, lang: string): string[] {
  if (JS_LANGS.includes(lang)) {
    const result = ts.transpileModule(code, {
      compilerOptions: { target: ts.ScriptTarget.ES2022 },
      reportDiagnostics: true,
      fileName
    });
    return (result.diagnostics ?? []).map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n"));
  }

  const sourceFile = ts.createSourceFile(fileName, code, ts.ScriptTarget.ES2022, true);
  const host: ts.CompilerHost = {
    getSourceFile: (name, languageVersion) =>
      name === fileName ? sourceFile : getLibFile(name, languageVersion as ts.ScriptTarget),
    getDefaultLibFileName: (o) => ts.getDefaultLibFileName(o),
    writeFile: () => {},
    getCurrentDirectory: () => "",
    getCanonicalFileName: (f) => f,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: (name) => name === fileName || ts.sys.fileExists(join(tsLibDir, name)),
    readFile: () => undefined
  };
  const program = ts.createProgram([fileName], compilerOptions, host);
  return [...program.getSyntacticDiagnostics(sourceFile), ...program.getSemanticDiagnostics(sourceFile)]
    .filter((d) => !FRAGMENT_OK.has(d.code))
    .map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n"));
}

// ---------------------------------------------------------------------------
// 3. Esecuzione PREDICT: l'output dichiarato corretto deve essere l'output vero.
//    node:vm con contesto isolato, timeout sulla parte sincrona, deadline
//    complessiva per la parte async (await, setTimeout). I delay dei timer sono
//    compressi a max 50ms: l'ordine di scheduling (macro vs microtask) resta
//    corretto, la validazione non rallenta.
// ---------------------------------------------------------------------------

const RUN_TIMEOUT_MS = 2000;

// API browser non disponibili in Node: gli snippet che le usano non sono
// eseguibili deterministicamente qui e vengono saltati (li valida la review).
const DOM_DEPENDENT = /\b(document|window|localStorage|sessionStorage|navigator|alert|fetch|addEventListener)\b/;

/** Esito di un run: righe di console, oppure l'eccezione lanciata. */
type RunResult = { lines: string[]; thrown?: { name: string; message: string } };

function fmt(a: unknown): string {
  if (typeof a === "string") return a;
  if (typeof a === "function") return "[Function]";
  if (typeof a === "object" && a !== null) {
    try {
      return JSON.stringify(a);
    } catch {
      return String(a);
    }
  }
  return String(a); // number (NaN incluso), boolean, undefined, null, bigint, symbol
}

async function runSnippet(code: string): Promise<RunResult> {
  try {
    return { lines: await runSnippetOrThrow(code) };
  } catch (e) {
    const err = e as Error;
    return { lines: [], thrown: { name: err.name ?? "Error", message: err.message ?? String(e) } };
  }
}

async function runSnippetOrThrow(code: string): Promise<string[]> {
  const lines: string[] = [];
  const capture = (...args: unknown[]) => {
    lines.push(args.map(fmt).join(" "));
  };

  let pendingTimers = 0;
  let onTimersDrained: (() => void) | undefined;
  const timerDone = () => {
    pendingTimers--;
    if (pendingTimers === 0) onTimersDrained?.();
  };

  const sandbox = {
    console: { log: capture, error: capture, warn: capture, info: capture },
    setTimeout: (fn: () => void, ms?: number) => {
      pendingTimers++;
      return setTimeout(
        () => {
          try {
            fn();
          } finally {
            timerDone();
          }
        },
        Math.min(ms ?? 0, 50)
      );
    },
    clearTimeout,
    queueMicrotask
  };

  const context = vm.createContext(sandbox);
  // Con console.log: wrapper async (supporta top-level await). Senza: codice
  // raw, così il completion value dell'ultimo statement resta osservabile.
  const hasConsole = /console\./.test(code);
  const source = hasConsole ? `(async () => {\n${code}\n})()` : code;
  const script = new vm.Script(source, { filename: "snippet.js" });

  let deadlineHandle: NodeJS.Timeout | undefined;
  const deadline = new Promise<never>((_, reject) => {
    deadlineHandle = setTimeout(() => reject(new Error(`timeout ${RUN_TIMEOUT_MS}ms`)), RUN_TIMEOUT_MS);
    deadlineHandle.unref();
  });

  try {
    const result = script.runInContext(context, { timeout: RUN_TIMEOUT_MS });
    const value = await Promise.race([Promise.resolve(result), deadline]);
    // Snippet senza console.log ("a cosa valuta l'espressione"): l'output è il
    // completion value dell'ultimo statement.
    if (!hasConsole && lines.length === 0 && value !== undefined) {
      lines.push(fmt(value));
    }
    if (pendingTimers > 0) {
      await Promise.race([
        new Promise<void>((resolve) => {
          onTimersDrained = resolve;
        }),
        deadline
      ]);
    }
    await new Promise((r) => setTimeout(r, 0)); // flush finale delle microtask
  } finally {
    clearTimeout(deadlineHandle);
  }
  return lines;
}

// ---------------------------------------------------------------------------
// 4. Checks sulla prosa
// ---------------------------------------------------------------------------

type Severity = "error" | "warn";
type Issue = { lesson: string; file: string; severity: Severity; message: string };

/** Normalizza per confronti tolleranti: trim e niente punto finale. */
function norm(s: string): string {
  return s.trim().replace(/\.+$/, "");
}

/** Confronta l'output reale con l'opzione dichiarata, accettando le convenzioni
 *  del contenuto: valore esatto, valore tra virgolette per indicare una stringa
 *  ("345" per l'output 345), separatore ", then " per output multi-riga. */
function outputMatches(output: string, declared: string): boolean {
  const candidates = [
    declared,
    declared.replace(/^["']([\s\S]*)["']$/, "$1"), // "345" → 345
    declared.replace(/,\s*then\s+/gi, "\n") // "undefined, then 5" → due righe
  ];
  return candidates.some((c) => norm(c) === norm(output));
}

/** Sostituisce con righe vuote gli span da escludere (code fence, SimplyPut),
 *  preservando i numeri di riga del resto. */
function blankOut(text: string, patterns: RegExp[]): string {
  let out = text;
  for (const re of patterns) {
    out = out.replace(re, (m) => m.replace(/[^\n]/g, " "));
  }
  return out;
}

function checkProse(body: string, bodyStartLine: number, push: (sev: Severity, msg: string) => void): void {
  // Forward reference: il formato canonico è il componente MDX
  // <ForwardRef module="..." title="..." />. I tag testuali [→ ...] sono legacy.
  for (const m of body.matchAll(/\[→[^\]]*\]/g)) {
    const line = bodyStartLine + body.slice(0, m.index).split("\n").length - 1;
    push("error", `riga ${line}: forward reference legacy "${m[0]}" — usa <ForwardRef module="..." title="..." />`);
  }
  for (const m of body.matchAll(/<ForwardRef\b[^>]*\/?>/g)) {
    const tag = m[0];
    const line = bodyStartLine + body.slice(0, m.index).split("\n").length - 1;
    if (!/\bmodule="[^"]+"/.test(tag) || !/\btitle="[^"]+"/.test(tag)) {
      push("error", `riga ${line}: <ForwardRef> senza module o title: ${tag}`);
    }
  }

  const proseOnly = blankOut(body, [/```[\s\S]*?```/g, /<SimplyPut>[\s\S]*?<\/SimplyPut>/g]);

  // Backtick inline fuori da code block e SimplyPut → violazione InlineCode
  // (i backtick rendono male nella pipeline MDX: usare <InlineCode>).
  for (const [i, lineText] of proseOnly.split("\n").entries()) {
    if (lineText.includes("`")) {
      push("error", `riga ${bodyStartLine + i}: backtick inline fuori da code block/SimplyPut — usa <InlineCode>`);
    }
  }

  // Em dash: violazione di stile become.dev (usare punto, virgola o parentesi).
  const emDashLines = proseOnly
    .split("\n")
    .map((l, i) => (l.includes("—") ? bodyStartLine + i : -1))
    .filter((n) => n > 0);
  if (emDashLines.length > 0) {
    push("warn", `em dash in prosa (violazione di stile): righe ${emDashLines.join(", ")}`);
  }

  // Accessibilità: paragrafi oltre 5 frasi senza pausa visiva.
  let paragraphStart = bodyStartLine;
  for (const para of proseOnly.split(/\n\s*\n/)) {
    const lineCount = para.split("\n").length;
    const text = para.trim();
    const isProse = text.length > 0 && !/^[#>|\-*\d<[]/.test(text);
    if (isProse) {
      const sentences = text.match(/[.!?]+(?=\s|$)/g)?.length ?? 0;
      if (sentences > 5) {
        push("warn", `riga ~${paragraphStart}: paragrafo di ${sentences} frasi senza pausa visiva (max 5)`);
      }
    }
    paragraphStart += lineCount + 1;
  }
}

// ---------------------------------------------------------------------------
// 5. Walker del modulo
// ---------------------------------------------------------------------------

async function validateLesson(dir: string, lessonId: string): Promise<Issue[]> {
  const issues: Issue[] = [];
  const pusher =
    (file: string) =>
    (severity: Severity, message: string) =>
      issues.push({ lesson: lessonId, file, severity, message });

  // exercises.json
  {
    const push = pusher("exercises.json");
    try {
      const raw: unknown = JSON.parse(await readFile(join(dir, "exercises.json"), "utf8"));
      if (!Array.isArray(raw)) {
        push("error", "non è un array");
      } else {
        for (const [i, ex] of raw.entries()) {
          const parsed = Exercise.safeParse(ex);
          if (!parsed.success) {
            push("error", `esercizio ${i}: ${parsed.error.issues.map((x) => `${x.path.join(".")}: ${x.message}`).join("; ")}`);
            continue;
          }
          const data = parsed.data;
          if (data.type === "PREDICT" && !DOM_DEPENDENT.test(data.code)) {
            const declared = data.options[data.correctIndex].trim();
            const result = await runSnippet(data.code);
            if (result.thrown) {
              // L'eccezione può essere la risposta corretta ("Throws TypeError: ...").
              const thrownStr = norm(`${result.thrown.name}: ${result.thrown.message}`);
              if (!norm(declared).includes(thrownStr)) {
                push(
                  "error",
                  `PREDICT ${i}: lo snippet lancia "${result.thrown.name}: ${result.thrown.message}" ma l'opzione corretta dichiara "${declared}"`
                );
              }
            } else {
              const output = result.lines.join("\n").trim();
              if (!outputMatches(output, declared)) {
                push("error", `PREDICT ${i}: output reale "${output}" ≠ opzione corretta dichiarata "${declared}"`);
              }
            }
          }
          if (data.type === "IMPLEMENT") {
            // I tests sono descrizioni in prosa (types/exercise.ts), non assert
            // eseguibili: qui si verifica che il codice sia sintatticamente valido
            // (check "js": gli esercizi dei moduli JS non sono tipizzati) e che
            // solutionCode non lanci al load. La correttezza rispetto ai tests
            // resta alla review LLM.
            for (const [label, code] of [
              ["starterCode", data.starterCode],
              ["solutionCode", data.solutionCode]
            ] as const) {
              for (const d of typecheck(code, `${lessonId}-impl-${i}.js`, "js")) {
                push("error", `IMPLEMENT ${i} ${label}: ${d}`);
              }
            }
            if (!DOM_DEPENDENT.test(data.solutionCode)) {
              const result = await runSnippet(data.solutionCode);
              if (result.thrown) {
                push("error", `IMPLEMENT ${i}: solutionCode lancia al load — ${result.thrown.name}: ${result.thrown.message}`);
              }
            }
          }
        }
      }
    } catch (e) {
      push("error", `illeggibile o JSON invalido: ${(e as Error).message}`);
    }
  }

  // quiz.json
  {
    const push = pusher("quiz.json");
    try {
      const raw: unknown = JSON.parse(await readFile(join(dir, "quiz.json"), "utf8"));
      if (!Array.isArray(raw)) {
        push("error", "non è un array");
      } else {
        if (raw.length < 3 || raw.length > 8) {
          push("error", `${raw.length} domande: il quiz di lezione ne richiede 3-8 (PLAN §4.2)`);
        }
        for (const [i, q] of raw.entries()) {
          const parsed = QuizQuestion.safeParse(q);
          if (!parsed.success) {
            push("error", `domanda ${i}: ${parsed.error.issues.map((x) => `${x.path.join(".")}: ${x.message}`).join("; ")}`);
          }
        }
      }
    } catch (e) {
      push("error", `illeggibile o JSON invalido: ${(e as Error).message}`);
    }
  }

  // prose.mdx
  {
    const push = pusher("prose.mdx");
    try {
      const mdxRaw = await readFile(join(dir, "prose.mdx"), "utf8");
      const { data, content: body } = matter(mdxRaw);
      const bodyStartLine = mdxRaw.split("\n").length - body.split("\n").length + 1;

      const fm = Frontmatter.safeParse(data);
      if (!fm.success) {
        push("error", `frontmatter: ${fm.error.issues.map((x) => `${x.path.join(".")}: ${x.message}`).join("; ")}`);
      } else {
        const sections = body.match(/^## /gm)?.length ?? 0;
        if (sections !== fm.data.sectionCount) {
          push("error", `frontmatter sectionCount=${fm.data.sectionCount} ma le sezioni "## " sono ${sections}`);
        }
      }

      for (const [i, block] of extractCodeBlocks(body).entries()) {
        if (![...TS_LANGS, ...JS_LANGS].includes(block.lang)) continue;
        // ```js no-check → blocco volutamente invalido a scopo didattico
        // (es. "// Invalid names"): escluso dal type-check.
        if (/\bno-check\b/.test(block.meta)) continue;
        for (const d of typecheck(block.code, `${lessonId}-block-${i}.${block.lang}`, block.lang)) {
          push("error", `code block ${i} (riga ${bodyStartLine + block.line - 1}): ${d}`);
        }
      }

      checkProse(body, bodyStartLine, push);
    } catch (e) {
      push("error", `illeggibile: ${(e as Error).message}`);
    }
  }

  return issues;
}

async function main() {
  const [moduleId, onlyLesson] = process.argv.slice(2);
  if (!moduleId) {
    console.error("Uso: tsx scripts/validate-content.ts <module-id> [lesson-id]");
    process.exit(2);
  }
  const lessonsDir = join("content", "modules", moduleId, "lessons");
  const lessons = (await readdir(lessonsDir, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => !onlyLesson || name === onlyLesson)
    .sort();

  if (lessons.length === 0) {
    console.error(`Nessuna lezione trovata in ${lessonsDir}`);
    process.exit(2);
  }

  const all: Issue[] = [];
  for (const lesson of lessons) {
    all.push(...(await validateLesson(join(lessonsDir, lesson), lesson)));
  }

  const errors = all.filter((i) => i.severity === "error");
  const warns = all.filter((i) => i.severity === "warn");

  for (const i of warns) console.warn(`⚠ [${i.lesson}/${i.file}] ${i.message}`);
  for (const i of errors) console.error(`✗ [${i.lesson}/${i.file}] ${i.message}`);

  if (errors.length === 0) {
    console.log(
      `✓ ${moduleId}: ${lessons.length} lezioni valide` + (warns.length ? ` (${warns.length} warning non bloccanti)` : "")
    );
    process.exit(0);
  }
  console.error(`\n${errors.length} errori, ${warns.length} warning in ${moduleId}`);
  process.exit(1);
}

main();
