/* import {
  Badge,
  Button,
  IconArrowRight,
  IconBook,
  IconChevronLeft,
  IconClock,
  IconCookie,
  IconZap,
  ProgressRing
} from "@/components/ui"; */
import { getLessonsByModule, getModuleMeta } from "@/lib/content";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
export default async function ModulePage({
  params
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;

  const [moduleMeta, lessons] = await Promise.all([
    getModuleMeta(moduleId),
    getLessonsByModule(moduleId)
  ]);

  return (
    <section className="min-h-screen">
      <div className="flex flex-col items-center gap-10 max-w-3/5  m-auto p-10">
        <div className="flex flex-col gap-2 w-full">
          <div>
            <span>{moduleMeta.track.toUpperCase()}</span>
            <span></span>
          </div>
          <span className="font-code text-primary font-bold">{`// ${moduleMeta.id}`}</span>
          <h1 className="text-5xl">{moduleMeta.title}</h1>
          <p className="text-lg">{moduleMeta.description}</p>
        </div>
        <div className="flex flex-col gap-5 w-full">
          {lessons.map((lesson) => (
            <Link
              href={`${moduleId}/lesson/${lesson.slug}`}
              key={lesson.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg"
            >
              <h2 className="text-xl font-bold flex items-center gap-5">
                <span className="grid place-content-center bg-primary/20 text-primary w-15 h-15 rounded-full">
                  {lesson.id.replace("0", "")}
                </span>
                {lesson.title}
              </h2>
              <ChevronRight />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
