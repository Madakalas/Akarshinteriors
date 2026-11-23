"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { mainNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { MobileNavigation } from "./MobileNavigation";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      // Hide when scrolling down past the hero, show as soon as the user scrolls up.
      if (Math.abs(y - last) > 6) {
        const hide = y > last && y > 480;
        setHidden(hide);
        // Lets sticky toolbars (e.g. the brand filter) slide up with the header.
        document.documentElement.toggleAttribute("data-header-hidden", hide);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on route change, outside click, and Escape.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
  }
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-forest text-ivory transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
        scrolled && "shadow-[0_10px_30px_-12px_rgb(0_0_0/0.45)]",
        hidden && !open && "-translate-y-full",
      )}
    >
      <div className={cn("container-x flex items-center justify-between gap-6 transition-[height] duration-300", scrolled ? "h-[78px]" : "h-[88px]")}>
        <Logo />

        <nav ref={navRef} aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              const hasChildren = "children" in item;
              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasChildren && setOpen(item.label)}
                  onMouseLeave={() => hasChildren && setOpen(null)}
                >
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className={cn(
                        "relative px-3 py-2 text-[0.88rem] font-medium transition-colors",
                        active ? "text-gold" : "text-ivory/85 hover:text-ivory",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                      {active && (
                        <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-gold" />
                      )}
                    </Link>
                    {hasChildren && (
                      <button
                        type="button"
                        aria-label={`${item.label} menu`}
                        aria-expanded={open === item.label}
                        aria-haspopup="true"
                        onClick={() => setOpen(open === item.label ? null : item.label)}
                        className="-ml-2 p-1 text-ivory/70 hover:text-gold"
                      >
                        <ChevronDown className={cn("size-3.5 transition-transform", open === item.label && "rotate-180")} aria-hidden />
                      </button>
                    )}
                  </div>
                  {hasChildren && open === item.label && (
                    <div className="absolute left-0 top-full pt-3">
                      <motion.ul
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="min-w-60 overflow-hidden rounded-2xl border border-line bg-white p-2 text-charcoal shadow-[var(--shadow-lift)]"
                      >
                        {item.children.map((c) => (
                          <li key={c.label}>
                            <Link
                              href={c.href}
                              className={cn(
                                "flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-beige-200 hover:text-forest",
                                pathname === c.href && "bg-beige-200 text-forest",
                              )}
                            >
                              {c.label}
                              <ArrowRight className="size-3.5 opacity-40" aria-hidden />
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-ivory/85 hover:text-gold xl:flex"
          >
            <Phone className="size-4" aria-hidden />
            {site.phone}
          </a>
          <Link
            href="/contact"
            className="hidden h-11 items-center gap-2 rounded-full bg-gold px-5 text-sm font-semibold text-forest transition-colors hover:bg-gold-300 sm:inline-flex"
          >
            Get Quote <ArrowRight className="size-4" aria-hidden />
          </Link>
          <MobileNavigation pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
