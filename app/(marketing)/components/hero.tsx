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
    <section className="pt-30 flex flex-col h-screen items-center gap-20 justify-center">
      <h1 className="text-7xl text-center lg:max-w-3/5 font-semibold font-poppins">
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
          className="bg-primary text-white px-5 py-4 font-bold rounded-lg transition-colors ease-in-out hover:bg-orange-700"
        >
          Choose your path →
        </Link>
        <Link
          href="/modules"
          className="border border-muted/50 text-muted px-5 py-4 font-bold rounded-lg transition-colors ease-in-out hover:border-black"
        >
          Browse Modules
        </Link>
      </div>
      <div className="flex gap-10">
        <Stats stats={STATS} />
      </div>
    </section>
  );
}
