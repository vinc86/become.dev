import { Exercise } from "./exercise";
import { Quiz } from "./quiz";

export type Track = "foundations" | "professional" | "advanced";

export type Lesson = {
  prose: string;
  exercises: Exercise[];
  quiz: Quiz[];
};

export type Module = {
  lessons: Lesson[];
};

export type ModuleMeta = {
  id: string;
  title: string;
  track: Track;
  paths: string[];
  totalLesson: number;
  version: string;
  description: string;
  prerequisites: string[];
  estimatedHours: number;
};

export type LessonMeta = {
  id: string;
  title: string;
  sectionCount: number;
};
