import { Exercise } from "./exercise";
import { Quiz } from "./quiz";

type Track = "foundations" | "professional" | "advanced";

type Lesson = {
  prose: string;
  exercises: Exercise[];
  quiz: Quiz[];
};

type Module = {
  lessons: Lesson[];
};

type ModuleMeta = {
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

type LessonMeta = {
  id: string;
  title: string;
  sectionCount: number;
};
