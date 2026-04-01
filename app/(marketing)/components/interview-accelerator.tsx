import Link from "next/link";

export default function InterviewAccelerator() {
  return (
    <section className="pt-20 max-w-300 px-10 mb-30 mx-auto">
      <div
        className="flex flex-col bg-foreground gap-7 p-15 rounded-3xl"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(222, 85, 30, 0.259) 0%, transparent 60%), var(--color-foreground)"
        }}
      >
        <span className="font-code text-sm uppercase text-primary tracking-wide">
          {"// Coming Soon"}
        </span>
        <h2 className="font-poppins text-background text-[clamp(2rem,5vw,3.5rem)] tracking-tight leading-10 md:leading-15 font-extrabold w-60 md:w-80 lg:w-100">
          Interview Accelerator
        </h2>
        <div className="flex flex-col md:flex-row gap-7">
          <div className="flex flex-col gap-15 flex-2">
            <p className="text-background">
              Track-specific interview prep that cross-references the modules
              you&apos;ve already completed. Junior, Mid, and Senior paths. No
              duplicate content, just focused practice for the interview room.
            </p>
          </div>

          <div className="flex flex-1 items-center md:justify-end">
            {/*TODO: Extract to ui component */}

            <Link
              className="text-white font-bold px-5 py-4 w-fit h-fit rounded-md ease-in-out bg-primary transition-all duration-200 hover:-translate-y-2 hover:bg-orange-500"
              href="/start"
            >
              Join waitlist →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
