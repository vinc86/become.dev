import Hero from "./components/hero";
import Navigation from "./components/navigation";
import Paths from "./components/paths";

export default function Marketing() {
  return (
    <div className="p-5">
      <Navigation />
      <main>
        <Hero />
        <Paths />
      </main>
    </div>
  );
}
