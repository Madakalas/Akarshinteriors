"use client";

import { useId } from "react";
import type { Finish } from "@/data/finishes";

type Board = NonNullable<Finish["board"]>;

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function shade(hex: string, k: number) {
  const [r, g, b] = hexToRgb(hex).map((v) => Math.max(0, Math.min(255, Math.round(k < 0 ? v * (1 + k) : v + (255 - v) * k))));
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}
function luminance(hex: string) {
  const [r, g, b] = hexToRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}
function seedOf(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 997;
  return h + 1;
}
const rgb01 = (hex: string) => hexToRgb(hex).map((v) => (v / 255).toFixed(3));
const tint = (hex: string, a: number, b: number) => {
  const [r, g, bl] = rgb01(hex);
  return `0 0 0 0 ${r}  0 0 0 0 ${g}  0 0 0 0 ${bl}  ${a} 0 0 0 ${b}`;
};

/**
 * A fluted laminate sheet drawn as a standing board (front face, edge, soft shadow),
 * in the shade's colour and flute profile. Original artwork — no product photography.
 */
export function FluteBoard({ code, board, className }: { code: string; board: Board; className?: string }) {
  // unique per instance: the same shade can be on screen twice (card + detail panel, or a hidden
  // previous page kept by Next), and SVG paint servers inside a hidden copy would not render
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const seed = seedOf(code);
  const { profile, decor, base } = board;
  const light = luminance(base) > 0.55;
  const vein = decor === "stone" ? (light ? shade(base, -0.45) : shade(base, 0.75)) : shade(base, -0.3);
  const face = "110,40 232,76 232,300 110,300";
  const diag = profile === "diag-l" || profile === "diag-r";

  return (
    <svg viewBox="0 0 300 300" className={className} role="img" aria-label="Rendered preview of the fluted laminate">
      <defs>
        <clipPath id={`c${id}`}>
          <polygon points={face} />
        </clipPath>
        <linearGradient id={`sh${id}`} x1="1" x2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.22" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`lt${id}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
        <filter id={`sb${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        {/* one flute: dark edge → highlight → soft fall-off */}
        <linearGradient id={`fg${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.26" />
          <stop offset="0.38" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="0.72" stopColor="#fff" stopOpacity="0.04" />
          <stop offset="1" stopColor="#000" stopOpacity="0.24" />
        </linearGradient>
        <pattern
          id={`fl${id}`}
          width={profile === "section" ? 5 : 6}
          height="40"
          patternUnits="userSpaceOnUse"
          patternTransform={profile === "diag-r" ? "rotate(45)" : profile === "diag-l" ? "rotate(-45)" : undefined}
        >
          <rect width={profile === "section" ? 5 : 6} height="40" fill={`url(#fg${id})`} />
        </pattern>
        {decor === "wood" && (
          <filter id={`w${id}`} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.22 0.006" numOctaves={3} seed={seed} />
            <feColorMatrix type="matrix" values={tint(vein, 1.6, -0.55)} />
          </filter>
        )}
        {decor === "stone" && (
          <filter id={`m${id}`} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="turbulence" baseFrequency="0.008 0.012" numOctaves={5} seed={seed} />
            <feComponentTransfer>
              <feFuncR type="table" tableValues="1 0.5 0.1 0 0 0 0 0 0 0" />
            </feComponentTransfer>
            <feColorMatrix type="matrix" values={tint(vein, 0.9, 0)} />
          </filter>
        )}
      </defs>

      <polygon points="54,78 110,62 110,300 54,300" fill={`url(#sh${id})`} filter={`url(#sb${id})`} />
      <polygon points="103,44 110,40 110,300 103,300" fill={shade(base, -0.35)} />

      <g clipPath={`url(#c${id})`}>
        <rect x="100" y="30" width="140" height="280" fill={base} />
        {decor === "wood" && <rect x="100" y="30" width="140" height="280" filter={`url(#w${id})`} />}
        {decor === "stone" && <rect x="100" y="30" width="140" height="280" filter={`url(#m${id})`} />}
        {profile === "section" ? (
          // ribs in vertical sections separated by flat bands
          [0, 1, 2].map((i) => <rect key={i} x={116 + i * 40} y="30" width="28" height="280" fill={`url(#fl${id})`} />)
        ) : (
          <rect x={diag ? 40 : 110} y={diag ? -40 : 30} width={diag ? 260 : 130} height={diag ? 400 : 280} fill={`url(#fl${id})`} />
        )}
        <rect x="100" y="30" width="140" height="280" fill={`url(#lt${id})`} />
      </g>
    </svg>
  );
}
