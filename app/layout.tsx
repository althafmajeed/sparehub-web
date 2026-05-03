import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { CartProvider } from "@/lib/cart-context";
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
      <body className="flex min-h-full flex-col bg-[#090A0C] font-sans text-zinc-100 antialiased">
        <CartProvider>
          <Navbar />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          <WhatsAppFloat />
        </CartProvider>
        <footer className="mt-auto border-t border-white/[0.06] py-8 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Mozaco LLC · SpareHub · Premium automotive
          parts marketplace
        </footer>
      </body>
    </html>
  );
}
