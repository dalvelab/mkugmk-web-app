export type FaqPage = {
  title: string;
  description: string;
  questions_with_answers: {
    id: number;
    topic: string;
    question: string;
    answer: string;
  }[];
};
