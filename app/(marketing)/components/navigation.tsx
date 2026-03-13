import Link from "next/link";

const ONPAGE_LINKS = [
  {
    label: "Paths",
    href: "paths"
  },
  {
    label: "Modules",
    href: "modules"
  },
  {
    label: "How it works",
    href: "how-it-works"
  }
] as const;

export default function Navigation() {
  return (
    <nav className="hidden fixed md:flex w-full h-16 items-center justify-between px-5 backdrop-blur-md bg-gray-50/5">
      <span className="text-2xl font-bold flex items-center gap-2">
        <span className="bg-primary block h-1.5 w-1.5 rounded-full animate-pulse"></span>
        <span>
          become<span className="text-primary">.dev</span>
        </span>
      </span>
      <div className="flex gap-10 text-sm font-semibold items-center">
        <ul className="flex gap-10">
          {ONPAGE_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={`#${link.href}`}
                className="hover:text-black text-muted transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
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
