"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Phone } from "lucide-react";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppButton";
import { site, whatsappLink } from "@/lib/site";

/** Sticky contact bar on phones — the three actions people want most. */
export function MobileActionBar() {
  const pathname = usePathname();
  const onContact = pathname === "/contact";
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-12px_rgb(16_45_39/0.25)] backdrop-blur sm:hidden"
    >
      <a href={site.phoneHref} className="flex flex-col items-center gap-0.5 py-2.5 text-[0.7rem] font-semibold text-forest active:bg-beige-200">
        <Phone className="size-5" aria-hidden /> Call
      </a>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 py-2.5 text-[0.7rem] font-semibold text-[#1a7a43] active:bg-beige-200"
      >
        <WhatsAppGlyph className="size-5" /> WhatsApp
      </a>
      <Link
        href={onContact ? "#main" : "/contact"}
        className="m-1.5 flex flex-col items-center justify-center gap-0.5 rounded-xl bg-gold py-1.5 text-[0.7rem] font-bold text-forest active:bg-gold-300"
      >
        <FileText className="size-5" aria-hidden /> Free Quote
      </Link>
    </nav>
  );
}
