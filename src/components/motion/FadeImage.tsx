"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/** next/image that eases in (blur → sharp) once loaded, over a soft shimmer. */
export function FadeImage({ className, onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <span aria-hidden className="absolute inset-0 animate-pulse bg-beige" />}
      <Image
        {...props}
        alt={props.alt}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={cn(
          "transition-[opacity,filter,transform] duration-700 ease-out motion-reduce:transition-none",
          loaded ? "opacity-100 blur-0" : "opacity-0 blur-md",
          className,
        )}
      />
    </>
  );
}
