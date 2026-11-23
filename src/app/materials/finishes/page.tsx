import { permanentRedirect } from "next/navigation";

/** The library now lives on the Materials page. */
export default function FinishesPage() {
  permanentRedirect("/materials#library");
}
