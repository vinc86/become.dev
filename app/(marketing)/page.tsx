import CookieEconomy from "./components/cookie-economy";
import Footer from "./components/footer";
import Hero from "./components/hero";
import HowItWorks from "./components/how-it-works";
import InterviewAccelerator from "./components/interview-accelerator";
import Navigation from "./components/navigation";
import Paths from "./components/paths";
import CtaBanner from "./components/cta-banner";

export default function Marketing() {
  return (
    <div>
      <Navigation />
      <main className="flex flex-col items-center w-full">
        <Hero />
        <Paths />
        <HowItWorks />
        <CookieEconomy />
        <InterviewAccelerator />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
