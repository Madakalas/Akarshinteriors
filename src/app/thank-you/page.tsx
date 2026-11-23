import type { Metadata } from "next";
import { CircleCheck } from "lucide-react";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <section className="section bg-beige-200">
      <div className="container-x flex max-w-2xl flex-col items-center text-center">
        <span className="grid size-20 place-items-center rounded-full bg-forest text-gold">
          <CircleCheck className="size-10" strokeWidth={1.5} aria-hidden />
        </span>
        <h1 className="mt-8 text-4xl sm:text-5xl">Thank you!</h1>
        <p className="mt-4 text-lg text-muted">
          We&apos;ve received your enquiry. Our team will contact you shortly to plan the next steps for your home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/projects" arrow>Explore Our Works</Button>
          <Button href={whatsappLink()} variant="outline" icon={<WhatsAppGlyph className="size-5" />}>
            Chat on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
