"use client";
import Navigation from "./navigation";
import { ONPAGE_LINKS } from "../constants";
import MobileNavigation from "./mobile-navigation";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

export default function Header() {
  const [showNavigation, setShowNavigation] = useState(false);

  return (
    <header className="w-full">
      {showNavigation && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setShowNavigation(false)}
        />
      )}
      <MobileNavigation
        items={ONPAGE_LINKS}
        showNavigation={showNavigation}
        handleShowNavigation={setShowNavigation}
      />
      <Navigation items={ONPAGE_LINKS} />

      {showNavigation || (
        <button
          className="fixed md:hidden top-5 right-5 rounded-md p-2 bg-background"
          onClick={() => setShowNavigation(true)}
        >
          <MenuIcon />
        </button>
      )}
    </header>
  );
}
