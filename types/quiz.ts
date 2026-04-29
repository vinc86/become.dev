type McqQuiz = {
  type: "MCQ";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type ScenarioQuiz = {
  type: "SCENARIO";
  setup: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type Quiz = McqQuiz | ScenarioQuiz;
