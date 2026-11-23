import type { MetadataRoute } from "next";
import { getLocations } from "@/data/locations";
import { getProjects } from "@/data/projects";
import { services } from "@/data/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => new URL(p, site.url).toString();
  const staticRoutes = ["/", "/services", "/projects", "/locations", "/materials", "/process", "/about", "/3d-design", "/contact", "/privacy-policy", "/terms"];
  return [
    ...staticRoutes.map((p) => ({ url: u(p), priority: p === "/" ? 1 : 0.8 })),
    ...services.filter((s) => !s.href).map((s) => ({ url: u(`/services/${s.slug}`), priority: 0.7 })),
    ...getProjects().map((p) => ({ url: u(`/projects/${p.slug}`), priority: 0.7 })),
    ...getLocations().map((l) => ({ url: u(`/locations/${l.slug}`), priority: 0.8 })),
  ];
}
