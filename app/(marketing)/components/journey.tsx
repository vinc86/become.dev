import React from "react";
import Card from "./ui/card";

const JOURNEYS: { title: string; description: string }[] = [
  {
    title: "Read & understand",
    description:
      'Clear prose with a "Simply Put" block for every concept. Technical precision first, plain English second.'
  },
  {
    title: "Practice with exercises",
    description:
      "ORDER, PREDICT, IDENTIFY, FIX. Hands-on every lesson. This is where you earn your cookies."
  },
  {
    title: "Assess your knowledge",
    description:
      "Quizzes and scenario questions unlock after practice. Score with full reasoning on every answer."
  },
  {
    title: "Unlock the next lesson",
    description:
      "Spend your cookies to progress. One focused session earns enough to move forward."
  }
];

export default function Journey() {
  return (
    <section className="flex flex-col gap-7 bg-foreground w-full">
      <div
        id="how-it-works"
        className="mx-auto py-20 flex flex-col gap-7 max-w-300 w-full px-10"
      >
        <span className="font-code text-sm uppercase text-primary tracking-wide">
          {"// The Method"}
        </span>
        <h2 className="font-poppins text-[clamp(2rem,4vw,3.5rem)] tracking-tight font-extrabold text-background w-60 md:w-80 lg:w-100">
          How it works
        </h2>
        <div className="flex flex-col gap-15">
          <p className="text-lg text-background/50">
            Not another video course. Every lesson is built around doing, not
            watching.
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-center lg:h-80 md:h-100">
            {JOURNEYS.map((journey, i) => (
              <Card
                key={journey.title}
                className="flex flex-col md:h-full w-full flex-1 gap-5 bg-foreground-light border border-muted p-10 md:p-5 md:justify-around transition-all ease-in-out hover:bg-foreground"
              >
                <span className="font-poppins text-6xl font-bold text-background/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-3">
                  <h2 className="text-background text-xl font-poppins font-semibold">
                    {journey.title}
                  </h2>
                  <p className="text-background/50">{journey.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
