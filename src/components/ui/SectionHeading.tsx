import { cn } from "@/lib/utils";
import { AnimatedTitle } from "@/components/motion/AnimatedTitle";
import { Reveal } from "./Reveal";

interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  action?: React.ReactNode;
  as?: "h1" | "h2";
}

export function SectionHeading({ eyebrow, title, description, align = "left", dark, className, action, as = "h2" }: Props) {
  const H = as;
  return (
    <Reveal
      className={cn(
        "mb-10 flex flex-col gap-6 lg:mb-14",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <span className={cn("eyebrow mb-4", dark && "eyebrow-dark")}>{eyebrow}</span>}
        <H
          className={cn(
            "text-[2rem] leading-[1.12] sm:text-4xl lg:text-[2.9rem]",
            dark ? "text-ivory" : "text-forest",
          )}
        >
          {typeof title === "string" ? <AnimatedTitle text={title} /> : title}
        </H>
        {description && (
          <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", dark ? "text-ivory/75" : "text-muted")}>{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
