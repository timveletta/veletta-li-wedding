const ScheduleItem = ({
  time,
  children,
}: {
  time: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="first-of-type:border-t border-b border-primary max-w-md w-full px-2 py-6 flex gap-8 items-baseline">
      <p className="font-sans font-bold text-primary">{time}</p>
      <p className="font-instrument-serif text-2xl text-primary">{children}</p>
    </div>
  );
};

export function ScheduleSection() {
  return (
    <section id="schedule" className="mx-auto md:py-36 py-48 px-2 container">
      <h2 className="font-instrument-serif text-6xl uppercase mb-4">
        The Schedule
      </h2>
      <h4 className="font-instrument-serif text-2xl mb-8">
        November 30, 2025 at Feld and Co, Booragoon
      </h4>
      <ScheduleItem time="5:00 PM">The Ceremony</ScheduleItem>
      <ScheduleItem time="5:30 PM">Cocktail Hour</ScheduleItem>
      <ScheduleItem time="6:30 PM">Reception Dinner</ScheduleItem>
      <ScheduleItem time="8:00 PM">Gelato Cart</ScheduleItem>
      <ScheduleItem time="11:30 PM">Happily Ever GTFO</ScheduleItem>
    </section>
  );
}
