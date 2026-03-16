import Link from "next/link";
import Stats from "./stats";

type Stat = {
  value: string;
  label: string;
};
const STATS: Stat[] = [
  {
    value: "22",
    label: "Modules"
  },
  {
    value: "3",
    label: "Learning Paths"
  },
  {
    value: "300+",
    label: "Exercises"
  },
  {
    value: "0",
    label: "Passive Videos"
  }
];
export default function Hero() {
  return (
    <section className="md:pt-10 flex flex-col min-h-screen items-center gap-20 md:gap-15 justify-center">
      <h1 className="text-[clamp(3rem,8vw,5rem)] leading-20 md:leading-30 text-center w-full max-w-[70vw] font-extrabold md:tracking-wider font-poppins">
        The frontend school you
        <span className="text-primary"> actually need</span>
      </h1>
      <div className="w-2/3 text-center">
        <p className="text-muted">
          From zero to staff engineer.
          <br /> Deep internals, real exercises. <br /> No passive watching.
          <br />
          <span className="text-primary font-bold">No shortcuts.</span>
        </p>
      </div>
      <div className="flex gap-3">
        <Link
          href="/start"
          className="bg-primary text-white px-3 py-2 md:px-5 md:py-4 font-bold rounded-lg transition-colors ease-in-out hover:bg-orange-700"
        >
          Choose your path →
        </Link>
        <Link
          href="/modules"
          className="border border-muted/50 text-muted px-3 py-2 md:px-5 md:py-4 font-bold rounded-lg transition-colors ease-in-out hover:border-black"
        >
          Browse Modules
        </Link>
      </div>
      <div className="flex gap-5 md:gap-10">
        <Stats stats={STATS} />
      </div>
    </section>
  );
}
