import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="mx-auto md:py-36 py-48 px-2 flex flex-col text-center items-center bg-primary text-primary-foreground">
      <div className="font-instrument-serif sm:text-9xl text-6xl mb-4 uppercase">
        <h2>Tim Veletta</h2>
        <h2 className="flex items-center justify-center">
          <span className="sm:text-6xl text-4xl mr-4">&</span>Jenny Li
        </h2>
      </div>
      <h3 className="sm:text-8xl text-5xl font-moon-time sm:mb-16 mb-8">
        invite you to celebrate our wedding
      </h3>
      <div className="flex flex-col sm:flex-row uppercase justify-center sm:gap-8 gap-2 text-2xl font-bold font-instrument-serif">
        <h4 className="order-1 sm:order-1">November 30th, 2025</h4>
        <h4 className="order-2 sm:order-3 sm:text-right">5pm Feld & Co</h4>
        <Button
          size="lg"
          variant="secondary"
          asChild
          className="order-3 sm:order-2"
        >
          <Link href="/rsvp">RSVP</Link>
        </Button>
      </div>
    </section>
  );
}
