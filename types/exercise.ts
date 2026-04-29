type Test = {
  description: string;
  expectation: string;
};

type IdentifyExercise = {
  type: "IDENTIFY";
  question: string;
  code: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type OrderExercise = {
  type: "ORDER";
  question: string;
  code: string;
  items: string[];
  correctOrder: number[];
  explanation: string;
};

type ImplementExercise = {
  type: "IMPLEMENT";
  question: string;
  setup: string;
  starterCode: string;
  tests: Test[];
  solutionCode: string;
  explanation: string;
};

type FixExercise = {
  type: "FIX";
  question: string;
  buggyCode: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type PredictExercise = {
  type: "PREDICT";
  question: string;
  code: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type ClassifyItem = {
  label: string;
  category: string;
};

type ClassifyExercise = {
  type: "CLASSIFY";
  question: string;
  items: ClassifyItem[];
  categories: string[];
  explanation: string;
};
export type Exercise =
  | FixExercise
  | ImplementExercise
  | OrderExercise
  | IdentifyExercise
  | ClassifyExercise
  | PredictExercise;
