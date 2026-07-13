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
  description: string;
  track: Track;
  paths: string[];
};

export type LessonLockState =
  | "unlocked"
  | "completion-locked"
  | "purchase-locked"
  | "free-preview";

export type LessonMeta = {
  id: string;
  slug: string;
  title: string;
  sectionCount: number;
  freePreview: boolean;
};
