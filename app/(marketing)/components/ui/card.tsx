import { cn } from "@/app/lib/utils";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type CardProps = Props &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export default function Card({ children, className, ...props }: CardProps) {
  return (
    <article
      className={cn(
        "flex flex-col border border-gray-300 bg-white rounded-xl",
        className
      )}
      {...props}
    >
      {children}
    </article>
  );
}
