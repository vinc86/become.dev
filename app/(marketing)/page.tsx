import Hero from "./components/hero";
import Journey from "./components/journey";
import Navigation from "./components/navigation";
import Paths from "./components/paths";

export default function Marketing() {
  return (
    <div>
      <Navigation />
      <main className="flex flex-col items-center w-full">
        <Hero />
        <Paths />
        <Journey />
      </main>
    </div>
  );
}
