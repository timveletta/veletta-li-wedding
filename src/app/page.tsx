import FaqSection from "./faq-section";
import { FooterSection } from "./footer-section";
import { HeroSection } from "./hero-section";
import { ScheduleSection } from "./schedule-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ScheduleSection />
      <FaqSection />
      <FooterSection />
    </>
  );
}
