import { ForwardRef } from "@/app/(platform)/module/[moduleId]/components/ForwardRef";
import { InlineCode } from "@/app/(platform)/module/[moduleId]/components/InlineCode";
import { SimplyPut } from "@/app/(platform)/module/[moduleId]/components/SimplyPut";
import { type BundledLanguage, codeToHtml } from "shiki";
import type { MDXComponents } from "mdx/types";

interface CodeProps {
  children?: string;
  className?: string;
}

async function CodeBlock({ children, className }: CodeProps) {
  if (!children) return null;

  // Inline code: no className, render as simple <code>
  if (!className) {
    return <code>{children}</code>;
  }

  // Code block: has language class, render with Shiki
  const lang = (className.replace("language-", "") || "text") as BundledLanguage;

  const html = await codeToHtml(children.trim(), {
    lang,
    theme: "github-dark-default"
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function Pre({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export const mdxComponents: MDXComponents = {
  pre: Pre,
  code: CodeBlock,
  ForwardRef,
  InlineCode,
  SimplyPut
};
