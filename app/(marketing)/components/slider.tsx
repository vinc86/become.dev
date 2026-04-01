import React from "react";

type SliderProps = {
  currentValue: number;
  maxValue: number;
};
export default function Slider({ maxValue, currentValue }: SliderProps) {
  return (
    <span className="bg-gray-100 relative right-0 w-full h-2 rounded-full">
      <span
        style={{ width: `${(currentValue / maxValue) * 100}%` }}
        className="absolute left-0 bg-[linear-gradient(to_right,var(--primary),orange)] h-full rounded-full"
      ></span>
    </span>
  );
}
