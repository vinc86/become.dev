import React from "react";
import ProgressTrackingCard from "./progress-tracking-card";

export default function CookieEconomy() {
  return (
    <section className="pt-20 flex flex-col md:flex-row gap-7 max-w-300 px-10 mb-30 items-center justify-between w-full mx-auto">
      <div className="flex flex-col gap-5  md:flex-1">
        <span className="font-code text-sm uppercase text-primary tracking-wide">
          {"// The cookie economy"}
        </span>
        <h2 className="font-poppins text-[clamp(2rem,5vw,3.5rem)] tracking-tight leading-10 md:leading-15 font-extrabold w-60 md:w-80 lg:w-100">
          Earn your way forward
        </h2>
        <div className="flex flex-col gap-10 max-w-100">
          <div className="flex flex-col gap-5">
            <p className="text-lg text-muted">
              Cookies are the only currency. Earned by completing exercises,
              spent to unlock lessons. No grinding, one focused session gets you
              to the next lesson.
            </p>
            <p className="text-lg text-muted">
              Need a hint? That costs 5 cookies, but only available after your
              first wrong attempt. The struggle is the point.
            </p>
          </div>
        </div>
      </div>
      <ProgressTrackingCard />
    </section>
  );
}
