"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import type { FAQ } from "@/lib/types";

export function FAQAccordion({ items }: { items: FAQ[] }) {
  return (
    <>
      <Accordion.Root type="single" collapsible className="divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
        {items.map((f, i) => (
          <Accordion.Item key={f.q} value={`f${i}`} className="group">
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left text-[1.02rem] font-semibold text-forest transition-colors hover:bg-beige-200 sm:px-7">
                {f.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-beige text-forest transition-transform duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-gold">
                  <Plus className="size-4" aria-hidden />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden px-5 text-muted data-[state=closed]:hidden sm:px-7">
              <p className="pb-6 leading-relaxed">{f.a}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }),
        }}
      />
    </>
  );
}
