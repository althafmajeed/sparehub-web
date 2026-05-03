import Link from "next/link";
import { Cog } from "lucide-react";
import { CartNavButton } from "@/components/CartNavButton";
import { MyGarageMenu } from "@/components/MyGarageMenu";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#090A0C]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 font-semibold tracking-tight text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded border border-[#FFBF00]/35 bg-[#FFBF00]/10 text-[#FFBF00] transition-colors group-hover:border-[#FFBF00]/55 group-hover:bg-[#FFBF00]/15">
            <Cog className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-lg">
            Spare<span className="text-[#FFBF00]">Hub</span>
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
          <CartNavButton />
          <MyGarageMenu />
        </nav>
      </div>
    </header>
  );
}
