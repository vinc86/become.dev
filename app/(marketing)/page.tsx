import CookieEconomy from "./components/cookie-economy";
import Footer from "./components/footer";
import Hero from "./components/hero";
import HowItWorks from "./components/how-it-works";
import Navigation from "./components/navigation";
import Paths from "./components/paths";

export default function Marketing() {
  return (
    <div>
      <Navigation />
      <main className="flex flex-col items-center w-full">
        <Hero />
        <Paths />
        <HowItWorks />
        <CookieEconomy />
      </main>
      <Footer />
    </div>
  );
}
