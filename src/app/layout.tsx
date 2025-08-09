import type { Metadata } from "next";
import { Amatic_SC, Allura } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation/navigation";
import { Footer } from "@/components/footer/footer";

const amaticSC = Amatic_SC({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-amatic-sc",
});

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-allura",
});

export const metadata: Metadata = {
  title: "Veletta Li Wedding",
  description: "Join us in celebrating the wedding of Tim and Jenny!",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${amaticSC.variable} ${allura.variable}`}>
        <Navigation />
        <main className="flex flex-col items-center justify-between py-24 px-2 text-center max-w-lg mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
