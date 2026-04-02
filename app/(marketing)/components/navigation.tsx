import Link from "next/link";
import { NavProps } from "../types";

export default function Navigation({ items }: NavProps) {
  return (
    <nav className="fixed hidden md:flex top-0 left-0 items-center justify-between w-full bg-white/80 h-16 p-5">
      <span className="text-2xl font-bold flex items-center gap-2">
        <span className="bg-primary block h-1.5 w-1.5 rounded-full animate-pulse"></span>
        <span className="font-poppins">
          become<span className="text-primary">.dev</span>
        </span>
      </span>
      <div className="flex gap-10 text-sm font-semibold items-center">
        <ul className="flex gap-10">
          {items.map((link) => (
            <li key={link.href}>
              <a
                href={`#${link.href}`}
                className="hover:text-black text-muted transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {/*TODO: Extract to ui component */}
        <Link
          className="bg-black text-white px-5 py-2 rounded-md transition-colors ease-in-out hover:bg-orange-600"
          href="/start"
        >
          Start Learning →
        </Link>
      </div>
    </nav>
  );
}
