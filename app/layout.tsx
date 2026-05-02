import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SpareHub — Automotive spare parts",
    template: "%s · SpareHub",
  },
  description:
    "SpareHub by Mozaco LLC — VIN-aware spare parts and your digital garage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#090A0C] font-sans text-zinc-100">
        <Navbar />
        <div className="flex flex-1 flex-col">{children}</div>
        <footer className="border-t border-white/[0.06] py-6 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Mozaco LLC · SpareHub
        </footer>
      </body>
    </html>
  );
}
