import RsvpForm from "@/components/rsvp-form";

export default function RsvpPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">RSVP</h1>
      <p className="text-center text-gray-600 mb-8">
        Please let us know if you&apos;ll be joining us for our special day!
      </p>
      <RsvpForm />
    </div>
  );
}
