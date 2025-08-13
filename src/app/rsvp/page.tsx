import RsvpForm from "@/components/rsvp-form/rsvp-form";

export default function RsvpPage() {
  return (
    <div className="mx-auto md:py-36 py-48 px-2 flex flex-col text-center items-center max-w-md">
      <h2 className="text-center text-primary font-instrument-serif text-4xl mb-8">
        Let us know if you&apos;ll be joining us for our special day!
      </h2>
      <RsvpForm />
    </div>
  );
}
