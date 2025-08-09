export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24 gap-8 text-primary text-center">
      <h3 className="text-2xl font-bold font-amatic-sc">
        Join us in celebrating the wedding of
      </h3>
      <div className="font-allura text-8xl">
        <h2 className="mr-8">Timothy</h2>
        <h2 className="ml-8 flex items-center">
          <span className="text-4xl mr-4">&</span>Jenny
        </h2>
      </div>
      <div className="text-2xl font-bold font-amatic-sc">
        <h4>Sunday 30th of November, 2025</h4>
        <h4>Feld & Co Booragoon</h4>
        <h4>Ceremony from 5:00pm</h4>
      </div>
    </main>
  );
}
