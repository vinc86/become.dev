import { getLesson, getLessonsByModule, getModuleMeta } from "@/lib/content";
import { mdxComponents } from "@/lib/mdx-components";
import { cn } from "@/lib/cn";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

export default async function Lesson({
  params
}: {
  params: Promise<{ lessonId: string; moduleId: string }>;
}) {
  const { moduleId, lessonId } = await params;

  const content = await getLesson(moduleId, lessonId);
  return (
    <div className="min-h-screen bg-background">
      <header></header>
      {/* Prose content */}
      <article className="prose dark:prose-invert prose-strong:text-lg prose-strong:font-bold prose-headings:font-display prose-headings:font-medium prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-2xl prose-h3:text-xl prose-p:text-text-secondary prose-p:leading-relaxed prose-a:text-primary-text prose-a:no-underline hover:prose-a:underline prose-strong:text-text-primary prose-code:text-text-primary max-w-none">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{ mdxOptions: { format: "mdx" } }}
        />
      </article>
    </div>
  );
}
