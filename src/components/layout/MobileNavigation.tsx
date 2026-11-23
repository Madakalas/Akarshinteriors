"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, MessageCircle, Phone, X } from "lucide-react";
import { mainNav, site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function MobileNavigation({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Routes stay mounted between navigations, so close the drawer when the path changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid size-11 place-items-center rounded-full bg-gold text-forest sm:hidden"
      >
        <MessageCircle className="size-5" aria-hidden />
      </a>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="grid size-11 place-items-center rounded-full border border-ivory/20 text-ivory lg:hidden"
        >
          <Menu className="size-5" aria-hidden />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm data-[state=open]:animate-in" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col bg-forest text-ivory shadow-2xl">
          <div className="flex h-[88px] items-center justify-between border-b border-ivory/10 px-5">
            <Logo />
            <Dialog.Close className="grid size-11 place-items-center rounded-full border border-ivory/20" aria-label="Close menu">
              <X className="size-5" aria-hidden />
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
          <Dialog.Description className="sr-only">Browse pages and contact Akarsh Interiors</Dialog.Description>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4">
            <ul className="divide-y divide-ivory/10">
              {mainNav.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                const hasChildren = "children" in item;
                const isOpen = expanded === item.label;
                return (
                  <li key={item.label}>
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className={cn("flex-1 py-4 font-serif text-xl", active ? "text-gold" : "text-ivory")}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                      {hasChildren && (
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-label={`Show ${item.label} links`}
                          onClick={() => setExpanded(isOpen ? null : item.label)}
                          className="grid size-11 place-items-center"
                        >
                          <ChevronDown className={cn("size-5 transition-transform", isOpen && "rotate-180")} aria-hidden />
                        </button>
                      )}
                    </div>
                    {hasChildren && isOpen && (
                      <ul className="mb-3 space-y-1 border-l border-gold/40 pl-4">
                        {item.children.map((c) => (
                          <li key={c.label}>
                            <Link href={c.href} onClick={() => setOpen(false)} className="block py-2 text-sm text-ivory/80 hover:text-gold">
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="grid gap-3 border-t border-ivory/10 p-5">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex h-12 items-center justify-center rounded-full bg-gold font-semibold text-forest"
            >
              Get Free Quote
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a href={site.phoneHref} className="flex h-12 items-center justify-center gap-2 rounded-full border border-ivory/25 text-sm">
                <Phone className="size-4" aria-hidden /> Call
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center justify-center gap-2 rounded-full border border-ivory/25 text-sm"
              >
                <MessageCircle className="size-4" aria-hidden /> WhatsApp
              </a>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
