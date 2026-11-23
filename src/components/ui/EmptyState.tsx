import { Images } from "lucide-react";

export function EmptyState({
  title,
  text,
  action,
  icon,
}: {
  title: string;
  text?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-[var(--radius-card)] border border-dashed border-gold/60 bg-beige-200/60 px-6 py-14 text-center">
      <span className="mb-4 grid size-14 place-items-center rounded-full bg-white text-gold-700 shadow-[var(--shadow-card)]">
        {icon ?? <Images className="size-6" strokeWidth={1.5} aria-hidden />}
      </span>
      <h3 className="text-xl">{title}</h3>
      {text && <p className="mt-2 max-w-md text-sm text-muted">{text}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-[var(--radius-card)] bg-white">
          <div className="aspect-[4/3] bg-beige" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-2/3 rounded bg-beige" />
            <div className="h-3 w-1/3 rounded bg-beige" />
          </div>
        </div>
      ))}
    </div>
  );
}
