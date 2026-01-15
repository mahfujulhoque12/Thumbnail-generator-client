import { Poppins } from "next/font/google";
import "./globals.css";
import LenisScroll from "@/components/LenisScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Thumblify - AI-powered Image Generation",
    template: "%s | Thumblify - AI-powered Image Generation",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/assets/background-splash.svg" as="image" />
      </head>
      <body>
        <Navbar />

        <LenisScroll />
        <main className="min-h-screen pt-26 ">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
