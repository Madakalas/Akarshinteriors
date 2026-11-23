import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="section bg-ivory">
      <div className="container-x max-w-3xl">
        <Breadcrumbs items={[{ label: title }]} />
        <h1 className="text-4xl sm:text-5xl">{title}</h1>
        <div className="mt-4 rounded-xl border border-gold/50 bg-gold/10 px-4 py-3 text-sm text-forest">
          Draft for review — this page should be checked and approved by Akarsh Interiors (and a legal adviser where appropriate) before launch.
        </div>
        <div className="mt-10 space-y-8 leading-relaxed text-charcoal/85 [&_h2]:mb-3 [&_h2]:text-2xl [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">
          {children}
        </div>
      </div>
    </section>
  );
}
