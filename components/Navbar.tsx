import Link from "next/link";
import { Cog } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#090A0C]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 font-semibold tracking-tight text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded border border-[#FF9F0A]/35 bg-[#FF9F0A]/10 text-[#FF9F0A] transition-colors group-hover:border-[#FF9F0A]/55 group-hover:bg-[#FF9F0A]/15">
            <Cog className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-lg">
            Spare<span className="text-[#FF9F0A]">Hub</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
