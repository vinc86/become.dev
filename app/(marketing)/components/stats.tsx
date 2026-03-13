import React from "react";

type Statistic = { label: string; value: string };

type Props = {
  stats: Statistic[];
};
export default function Stats({ stats }: Props) {
  /* TODO: Add dynamic numbers for tracks and modules based on actual content */

  return stats.map((stat) => (
    <div key={stat.label} className="flex flex-col items-center">
      <span className="font-poppins font-bold text-4xl">{stat.value}</span>
      <span className="text-muted">{stat.label}</span>
    </div>
  ));
}
