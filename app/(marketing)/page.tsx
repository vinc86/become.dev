import Hero from "./components/hero";
import Navigation from "./components/navigation";
import Paths from "./components/paths";

export default function Marketing() {
  return (
    <div className="px-5">
      <Navigation />
      <main className="w-full max-w-300 m-auto">
        <Hero />
        <Paths />
        <div></div>
      </main>
    </div>
  );
}
