import Link from "next/link";
import { Button } from "@/components/ui/Button";

const links = [
  { label: "Our Works", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Locations", href: "/locations" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="section bg-beige-200">
      <div className="container-x flex max-w-2xl flex-col items-center text-center">
        <p className="font-serif text-8xl text-gold sm:text-9xl">404</p>
        <h1 className="mt-4 text-3xl sm:text-4xl">This room hasn&apos;t been designed yet.</h1>
        <p className="mt-3 text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Button href="/" className="mt-8" arrow>Back to Home</Button>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-forest underline-offset-4 hover:underline">{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
