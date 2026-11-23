import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { site } from "@/lib/site";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, dark }: { items: Crumb[]; dark?: boolean }) {
  const all: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: new URL(c.href, site.url).toString() } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className={`flex flex-wrap items-center gap-1.5 text-xs font-medium ${dark ? "text-ivory/70" : "text-muted"}`}>
        {all.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3 opacity-60" aria-hidden />}
            {c.href && i < all.length - 1 ? (
              <Link href={c.href} className={dark ? "hover:text-gold" : "hover:text-gold-700"}>
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className={dark ? "text-gold" : "text-gold-700"}>
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
