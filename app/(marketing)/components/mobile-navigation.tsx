import Link from "next/link";
import { NavProps } from "../types";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/app/lib/utils";
import { X } from "lucide-react";

type MobileNavProps = {
  showNavigation: boolean;
  handleShowNavigation: Dispatch<SetStateAction<boolean>>;
} & NavProps;

export default function MobileNavigation({
  items,
  showNavigation,
  handleShowNavigation
}: MobileNavProps) {
  return (
    <nav
      className={cn(
        "flex md:hidden fixed top-0 right-0 bg-white w-70 h-screen p-5 flex-col transition-all duration-300",
        showNavigation ? "translate-x-0 z-50" : "translate-x-full"
      )}
    >
      <div className="flex w-full">
        <span className="text-2xl font-bold flex items-center gap-2">
          <span className="bg-primary block h-1.5 w-1.5 rounded-full animate-pulse"></span>
          <span className="font-poppins">
            become<span className="text-primary">.dev</span>
          </span>
        </span>
        <button
          onClick={() => handleShowNavigation((prev) => !prev)}
          className="ml-auto grid place-content-center border border-gray-500 w-8 h-8 rounded-lg hover:bg-background cursor-pointer transition-all ease-in-out"
        >
          <X color="#888" size={18} />
        </button>
      </div>
      <div className="flex h-full flex-col gap-10 font-semibold pt-10 p-5">
        <ul className="flex flex-col gap-10">
          {items.map((link) => (
            <li key={link.href}>
              <a
                href={`#${link.href}`}
                className="hover:text-black text-muted transition-colors"
                onClick={() => handleShowNavigation((prev) => !prev)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/*TODO: Extract to ui component */}
      <Link
        className="bg-primary font-bold text-white px-5 py-3 rounded-md transition-colors ease-in-out hover:bg-orange-500"
        href="/start"
      >
        Start Learning →
      </Link>
    </nav>
  );
}
