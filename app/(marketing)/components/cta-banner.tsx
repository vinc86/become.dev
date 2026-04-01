import Link from "next/link";
import React from "react";

export default function CtaBanner() {
  return (
    <section className="pt-20 max-w-300 px-10 mb-30 mx-auto items-center">
      <div className="flex flex-col w-full gap-7 p-15 items-center">
        <h2 className="text-center font-poppins text-[clamp(3rem,5vw,5rem)] tracking-tight lg:leading-15 leading-12 font-extrabold">
          Ready to <br />
          <span className="text-primary">become?</span>
        </h2>
        <p className="text-muted">
          Pick your path. Earn your cookies. Ship better code.
        </p>
        {/*TODO: Extract to ui component */}
        <Link
          className="text-white font-bold px-6 py-4 w-fit h-fit rounded-md ease-in-out bg-primary transition-all duration-200 hover:shadow-xl hover:-translate-y-2 hover:bg-orange-500"
          href="/start"
        >
          Choose your path →
        </Link>
      </div>
    </section>
  );
}
