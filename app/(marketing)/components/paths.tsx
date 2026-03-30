import React from "react";
import PathCard from "./path-card";

type Path = {
  title: string;
  description: string;
  tags: string[];
};
const PATHS: Path[] = [
  {
    title: "Zero to Junior",
    description:
      "For complete beginners or career-changers. Gets you job-ready with solid foundations and real projects.",
    tags: ["HTML & CSS", "JavaScript", "TypeScript", "Git", "React"]
  },
  {
    title: "Junior to Mid",
    description:
      "You can ship features. Now understand why things work. Close the gap between writing code and owning it.",
    tags: ["Advanced JS", "React Patterns", "Testing", "CI/CD", "Patterns"]
  },
  {
    title: "Mid to Senior",
    description:
      "Deep internals. Architecture. Leadership. The engineer others come to for the hard problems.",
    tags: [
      "V8 internals",
      "Rendering",
      "Performance",
      "Build tools",
      "AI-augmented"
    ]
  }
];

export default function Paths() {
  return (
    <section
      id="paths"
      className="pt-20 flex flex-col gap-7 max-w-300 px-10 mb-30"
    >
      <span className="font-code text-sm uppercase text-primary tracking-wide">
        {"// Learning paths"}
      </span>
      <h2 className="font-poppins text-[clamp(2rem,5vw,3.5rem)] leading-10 md:leading-15 font-extrabold w-60 md:w-80 lg:w-100">
        Pick where you are now
      </h2>
      <div className="flex flex-col gap-15">
        <p className="text-lg text-muted">
          Three distinct journeys. Same platform. The path sets your starting
          point.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-3 items-stretch">
          {PATHS.map((path, i) => (
            <PathCard
              key={path.title}
              id={(i + 1).toString()}
              title={path.title}
              description={path.description}
              tags={path.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
