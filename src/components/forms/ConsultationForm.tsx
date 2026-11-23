import { getLocations } from "@/data/locations";
import { serviceOptions } from "@/data/services";
import { ConsultationFormClient, type FormProps } from "./ConsultationFormClient";

/** True once an enquiry destination is configured (see .env.example). */
export function isEnquiryBackendEnabled() {
  return Boolean(process.env.ENQUIRY_WEBHOOK_URL);
}

type Props = Omit<FormProps, "backendEnabled" | "cities" | "services">;

export function ConsultationForm(props: Props) {
  return (
    <ConsultationFormClient
      {...props}
      backendEnabled={isEnquiryBackendEnabled()}
      cities={getLocations().map((l) => l.city)}
      services={[...serviceOptions, "Other"]}
    />
  );
}
