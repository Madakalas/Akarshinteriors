import { PageTransition } from "@/components/motion/PageTransition";

/** Re-mounts on every navigation, giving each page a gentle entrance. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
