import Card from "./ui/card";
import Slider from "./slider";
import { cn } from "@/app/lib/utils";

export default function ProgressTrackingCard() {
  // example data
  const exercisesCompletedValue = 5;
  const exercisesMaxValue = 8;
  const cookiesEarned = 85;
  const maxCookies = 100;

  const ACTIVITIES = [
    { label: "✓ ORDER exercise - correct", amount: "+10", muted: false },
    { label: "✓ PREDICT exercise - correct", amount: "+10", muted: false },
    { label: "💡 Hint revealed", amount: "-5", muted: true }
  ] as const;
  return (
    <Card className="md:flex-1 p-10 flex-col gap-5">
      <span className="font-code text-sm text-muted tracking-wide">
        {"// lesson_01 · progress"}
      </span>

      <div className="flex justify-between">
        <span className="text-muted font-code">Exercises completed</span>
        <span className="font-bold">
          {exercisesCompletedValue}/{exercisesMaxValue}
        </span>
      </div>
      <Slider
        currentValue={exercisesCompletedValue}
        maxValue={exercisesMaxValue}
      />

      <div className="flex justify-between">
        <span className="text-muted font-code">Cookies earned</span>
        <span className="font-bold">🍪 {cookiesEarned}</span>
      </div>
      <Slider currentValue={cookiesEarned} maxValue={maxCookies} />
      <hr />

      <span className="text-muted font-code">recent activity</span>

      <div className="flex flex-col gap-2">
        {ACTIVITIES.map((activity) => (
          <div
            key={activity.label}
            className={cn(
              "border border-gray-300 bg-gray-100 p-3 rounded-lg flex justify-between",
              activity.muted && "opacity-50"
            )}
          >
            <span className="text-muted">{activity.label}</span>
            <span className="font-code text-primary">{activity.amount} 🍪</span>
          </div>
        ))}

        <div className="border border-primary bg-gray-100 p-3 rounded-lg flex justify-between">
          <span className="text-muted font-bold">Unlock lesson 2</span>
          <span className="font-code text-primary">40 🍪 required</span>
        </div>
      </div>
    </Card>
  );
}
