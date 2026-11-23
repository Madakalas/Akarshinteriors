import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "forest" | "outline" | "outline-light" | "ghost";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-forest hover:bg-gold-300 shadow-[0_8px_20px_-8px_rgb(214_174_115/0.7)]",
  forest: "bg-forest text-ivory hover:bg-forest-700",
  outline: "border border-forest/25 text-forest hover:border-forest hover:bg-forest hover:text-ivory",
  "outline-light": "border border-white/40 text-white hover:bg-white hover:text-forest",
  ghost: "text-forest hover:text-gold-700",
};

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 active:scale-[0.97] disabled:opacity-60 disabled:pointer-events-none";

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

interface Props {
  href?: string;
  variant?: Variant;
  size?: keyof typeof sizes;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export function Button({
  href,
  variant = "gold",
  size = "md",
  arrow = false,
  className,
  children,
  external,
  type = "button",
  disabled,
  onClick,
  icon,
}: Props) {
  const cls = cn(base, variants[variant], sizes[size], className);
  const inner = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden />}
    </>
  );
  if (href) {
    if (external || href.startsWith("http") || href.startsWith("tel:")) {
      return (
        <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick}>
      {inner}
    </button>
  );
}
