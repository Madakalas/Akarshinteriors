import { FadeImage } from "@/components/motion/FadeImage";
import Link from "next/link";
import { ArrowUpRight, MapPin, PlayCircle } from "lucide-react";
import { cityName } from "@/data/locations";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, size = "md", priority }: { project: Project; size?: "md" | "lg" | "wide"; priority?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group card flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
    >
      <div
        className={cn(
          "img-zoom relative overflow-hidden",
          size === "md" && "aspect-[4/3]",
          size === "lg" && "aspect-[16/11] lg:aspect-auto lg:min-h-[420px] lg:flex-1",
          size === "wide" && "aspect-[16/9] sm:aspect-[16/7]",
        )}
      >
        <FadeImage
          src={project.coverImage}
          alt={project.gallery[0]?.altText ?? project.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-forest backdrop-blur">
            {project.propertyType === "Other" ? project.category : project.propertyType}
          </span>
          {project.stage === "design" && (
            <span className="rounded-full bg-gold px-3 py-1 text-[0.7rem] font-bold text-forest">3D Design</span>
          )}
          {project.sample && (
            <span className="rounded-full bg-forest/80 px-3 py-1 text-[0.7rem] font-semibold text-gold-300 backdrop-blur" title="Placeholder content">
              Sample
            </span>
          )}
        </div>
        <span className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-forest/75 via-forest/10 to-transparent pb-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="translate-y-3 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-forest shadow-lg transition-transform duration-500 group-hover:translate-y-0">
            View project · {project.gallery.length} photos
          </span>
        </span>
        {project.videos.length > 0 && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
            <PlayCircle className="size-3.5" aria-hidden /> Video
          </span>
        )}
      </div>
      <div className={cn("flex items-end justify-between gap-4 p-5", size !== "lg" && "flex-1")}>
        <div>
          <h3 className="text-lg leading-snug sm:text-xl">{project.title}</h3>
          {project.city && (
            <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-forest">
              <MapPin className="size-3.5 text-gold-700" aria-hidden /> {cityName(project.city)}
            </p>
          )}
          <p className="mt-0.5 text-sm text-muted">{project.category}</p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-forest transition-all duration-300 group-hover:border-gold group-hover:bg-gold">
          <ArrowUpRight className="size-4" aria-hidden />
          <span className="sr-only">View project</span>
        </span>
      </div>
    </Link>
  );
}
