const ScheduleItem = ({
  time,
  children,
}: {
  time: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="border-b border-primary max-w-md w-full px-2 py-6 flex gap-8 items-baseline">
      <p className="font-amatic-sc font-bold text-2xl text-primary">{time}</p>
      <p className="font-serif text-xl text-primary">{children}</p>
    </div>
  );
};

export default function SchedulePage() {
  return (
    <>
      <ScheduleItem time="5:00pm">Ceremony</ScheduleItem>
      <ScheduleItem time="5:30pm">Cocktail Hour</ScheduleItem>
      <ScheduleItem time="6:30pm">Pizza and Dumplings</ScheduleItem>
      <ScheduleItem time="8:00pm">Gelato Cart</ScheduleItem>
      <ScheduleItem time="11:30pm">Wedding Over :(</ScheduleItem>
    </>
  );
}
