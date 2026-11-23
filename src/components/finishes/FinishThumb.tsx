import Image from "next/image";
import type { Finish } from "@/data/finishes";
import { cn } from "@/lib/utils";
import { FluteBoard } from "./FluteBoard";

/** Square preview of a library item: PDF close-up, or the drawn board for brand shades. */
export function FinishThumb({ finish, className, sizes = "(min-width:1024px) 16vw, 33vw" }: { finish: Finish; className?: string; sizes?: string }) {
  return (
    <span className={cn("relative block overflow-hidden bg-[#f0efed]", className)}>
      {finish.image ? (
        <Image src={finish.image} alt={`${finish.name} ${finish.product.toLowerCase()}`} fill sizes={sizes} className="object-cover" />
      ) : finish.board ? (
        <FluteBoard code={finish.code} board={finish.board} className="size-full" />
      ) : null}
    </span>
  );
}
