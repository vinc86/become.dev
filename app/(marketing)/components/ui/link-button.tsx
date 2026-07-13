import { cn } from "@/lib/cn";
import { Link } from "lucide-react";
import { ReactNode } from "react";

type LinkButtonProps = {
  children: ReactNode;
  variant: "primary" | "secondary";
};

export default function LinkButton({ children, variant }: LinkButtonProps) {
  return (
    <Link
      href="/start"
      className={cn(
        variant === "primary" && "text-white hover:bg-orange-700 bg-primary",
        variant === "secondary" && "hover:border-black text-black",
        " px-3 py-2 md:px-5 md:py-4 font-bold rounded-lg transition-colors ease-in-out"
      )}
    >
      {children}
    </Link>
  );
}
