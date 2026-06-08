import type { Lesson, ModuleMeta, Track } from "@/types/content";
import { Exercise } from "@/types/exercise";
import { Quiz } from "@/types/quiz";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { basePath } from "./constants";
import { getRawFileData } from "./utils";
import tracks from "../content/tracks.json";

type Tracks = Record<Track, string[]>;

/**
 * Reads module meta.json
 */
export async function getModuleMeta(moduleId: string): Promise<ModuleMeta> {
  const meta = await readFile(
    path.join(basePath, `${moduleId}/meta.json`),
    "utf-8"
  );

  return JSON.parse(meta) as ModuleMeta;
}

/**
 * Reads lesson files prose.mdx, exercises.json and quiz.json
 */
export async function getLesson(
  moduleId: string,
  lessonId: string
): Promise<Lesson> {
  const proseRaw = await getRawFileData(moduleId, lessonId, "prose.mdx");
  const exercisesRaw = await getRawFileData(
    moduleId,
    lessonId,
    "exercises.json"
  );
  const quizRaw = await getRawFileData(moduleId, lessonId, "quiz.json");

  const lesson: Lesson = {
    prose: proseRaw,
    exercises: JSON.parse(exercisesRaw) as Exercise[],
    quiz: JSON.parse(quizRaw) as Quiz[]
  };

  return lesson;
}

let tracksCache: Tracks | null = null;

async function getTracks(): Promise<Tracks> {
  if (tracksCache) return tracksCache;
  const raw = await readFile(
    path.join(process.cwd(), "content/tracks.json"),
    "utf-8"
  );
  tracksCache = JSON.parse(raw) as Tracks;
  return tracksCache;
}

/**
 * Reads all modules from a given track
 */
export async function getModulesByTrack(track: Track): Promise<string[]> {
  const tracks = await getTracks();
  return tracks[track];
}
