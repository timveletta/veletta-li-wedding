import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation/navigation";
import { Footer } from "@/components/footer/footer";

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
      <body>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
