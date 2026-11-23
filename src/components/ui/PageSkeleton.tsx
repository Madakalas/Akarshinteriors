/**
 * Shown for a split second while a URL-specific page (project, service, city) streams in.
 * Mirrors the hero + content layout so the page doesn't jump.
 */
export function PageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading page">
      <section className="bg-beige-200">
        <div className="container-x grid animate-pulse gap-10 py-12 lg:grid-cols-[1.1fr_1fr] lg:py-16">
          <div className="space-y-5">
            <div className="h-3 w-40 rounded bg-beige" />
            <div className="h-6 w-28 rounded-full bg-beige" />
            <div className="h-12 w-4/5 rounded bg-beige" />
            <div className="h-4 w-full max-w-md rounded bg-beige" />
            <div className="h-4 w-3/4 max-w-sm rounded bg-beige" />
            <div className="h-12 w-48 rounded-full bg-beige" />
          </div>
          <div className="aspect-[4/3] rounded-[24px] bg-beige" />
        </div>
      </section>
      <section className="section">
        <div className="container-x grid animate-pulse gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] rounded-[var(--radius-card)] bg-beige" />
          ))}
        </div>
      </section>
    </div>
  );
}
