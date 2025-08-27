import Image from "next/image";
import JustMarriedImage from "../images/just-married.png";
import CakeImage from "../images/cake.png";

function VenueMap() {
  return (
    <div className="size-84 mx-auto border-primary border-2 rounded-md">
      <a
        href={
          "https://maps.google.com/maps?q=Feld+%26+Co+6/496+Marmion+St,+Booragoon,WA+6154"
        }
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full rounded-lg border border-gray-200 overflow-hidden duration-300 group"
      >
        <img
          src={
            "https://maps.googleapis.com/maps/api/staticmap?center=Feld+%26+Co+6/496+Marmion+St,+Booragoon,WA+6154&zoom=16&size=600x400&maptype=roadmap&markers=color:red%7CFeld+%26+Co+6/496+Marmion+St,+Booragoon,WA+6154&key=AIzaSyAFP08hchqAHUpuCctk2YTxZ0ExrBkRt8I"
          }
          loading="lazy"
          alt="Feld and Co"
          className="w-full h-full object-cover"
        />
      </a>
    </div>
  );
}

function FaqItem({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold font-instrument-serif my-4">
        {question}
      </h3>
      <p className="font-serif">{children}</p>
    </div>
  );
}

export default function FaqSection() {
  return (
    <>
      <section
        id="faq"
        className="md:py-36 py-48 px-2 bg-foreground text-background"
      >
        <div className="container mx-auto grid sm:grid-cols-2">
          <div>
            <Image
              className="-mb-36"
              width={500}
              height={500}
              src={CakeImage}
              alt="Wedding Cake"
            />
            <h2 className="font-instrument-serif text-9xl">FAQS</h2>
          </div>
          <div>
            <FaqItem question="What time should I arrive?">
              Please arrive by 5:00 pm for a 5:10–5:15 start.
            </FaqItem>
            <FaqItem question="How do I RSVP?">
              You can RSVP directly through this website or by texting Tim on
              0451 122 654. Please RSVP on or before September 30.
            </FaqItem>
            <FaqItem question="Can I bring a plus one or kids?">
              As much as we’d love to celebrate with your partners and little
              ones, our venue’s maximum capacity is 75 guests :(
            </FaqItem>
            <FaqItem question="Where is the reception?">
              Good news: you don’t have to find a second location! The ceremony
              and reception are both happening at Feld & Co.
            </FaqItem>
          </div>
        </div>
      </section>
      <section id="faq" className="md:py-36 py-48 px-2">
        <div className="container mx-auto grid sm:grid-cols-2">
          <div>
            <FaqItem question="Is there a dress code?">
              Cocktail attire. Think bright and colourful if you’d like to match
              the vibe (see colour palette below) — but no pressure! Wear
              whatever makes you feel fabulous and ready to dance.
            </FaqItem>
            <div className="w-full flex h-16 gap-2 mb-8 p-2">
              <div className="flex-1 h-full bg-[#e789a3]"></div>
              <div className="flex-1 h-full bg-[#c19ae7]"></div>
              <div className="flex-1 h-full bg-[#fbdb94]"></div>
              <div className="flex-1 h-full bg-[#abc5a1]"></div>
              <div className="flex-1 h-full bg-[#97bee3]"></div>
            </div>
            <FaqItem question="Where do I park?">
              There’s no parking at the venue itself, but plenty of spaces are
              available at the commercial buildings further along (498-504
              Marmion St) or opposite the venue (491-492 Marmion St).
            </FaqItem>
            <VenueMap />
          </div>
          <div className="order-first sm:order-none">
            <Image
              className="-mb-36"
              width={500}
              height={500}
              src={JustMarriedImage}
              alt="Just married car"
            />
            <h2 className="font-instrument-serif text-9xl text-right">FAQS</h2>
            <h3 className="font-moon-time text-6xl text-right">continued</h3>
          </div>
        </div>
      </section>
    </>
  );
}
