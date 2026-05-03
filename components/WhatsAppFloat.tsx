"use client";

import { MessageCircle } from "lucide-react";

const DEFAULT_E164 = "971500000000";

export function WhatsAppFloat() {
  const e164 = (
    process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? DEFAULT_E164
  ).replace(/\D/g, "");
  const href = `https://wa.me/${e164}?text=${encodeURIComponent(
    "Hi SpareHub — I need help with parts / fitment.",
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 ring-2 ring-[#090A0C] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFBF00]"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" aria-hidden />
    </a>
  );
}
