import Link from "next/link";
import React from "react";

export default function Footer() {
  const getYear = () => {
    const date = new Date();
    return date.getFullYear();
  };

  const year = getYear();

  const footerLinks = [
    {
      href: "/catalog",
      label: "Catalog"
    },
    {
      href: "/about",
      label: "About"
    }
  ] as const;

  return (
    <footer className="p-10 flex justify-around text-muted">
      <span className="font-code">&copy; {year} become.dev</span>
      <div className="flex gap-5">
        {footerLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
