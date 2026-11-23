import { cacheLife } from "next/cache";

/** Cached server-side so the year stays fresh without making pages dynamic. */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
