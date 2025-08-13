import Image from "next/image";
import FeldImage from "../images/feld-image.png";

export function FooterSection() {
  return (
    <section className="mx-auto md:py-16 py-24 px-2 flex flex-col text-center items-center bg-primary text-primary-foreground">
      <Image width={400} height={400} src={FeldImage} alt="Feld and Co" />
    </section>
  );
}
