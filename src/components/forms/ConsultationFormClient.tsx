"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppButton";
import { budgetOptions, propertyTypeOptions, timelineOptions } from "@/data/content";
import { enquirySchema, enquiryToWhatsApp, type EnquiryInput } from "@/lib/enquiry";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export interface FormProps {
  backendEnabled: boolean;
  variant?: "full" | "compact";
  cities: string[];
  services: string[];
  defaultService?: string;
  defaultCity?: string;
  submitLabel?: string;
  sourcePage: string;
  dark?: boolean;
}

export function ConsultationFormClient({
  backendEnabled,
  variant = "compact",
  cities,
  services,
  defaultService,
  defaultCity,
  submitLabel = "Send Enquiry",
  sourcePage,
}: FormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "whatsapp">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      city: defaultCity ?? "",
      service: defaultService ?? "",
      email: "",
      sourcePage,
    },
  });

  // Prefill from links such as /contact?city=Kurnool&service=Modular%20Kitchens
  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const c = qs.get("city");
    const s = qs.get("service");
    if (c && cities.includes(c)) setValue("city", c);
    if (s && services.includes(s)) setValue("service", s);
  }, [cities, services, setValue]);

  async function onSubmit(data: EnquiryInput) {
    setServerError(null);
    if (!backendEnabled) {
      window.open(whatsappLink(enquiryToWhatsApp(data)), "_blank", "noopener,noreferrer");
      setStatus("whatsapp");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Something went wrong. Please try again.");
      router.push("/thank-you");
    } catch (e) {
      setStatus("error");
      setServerError(e instanceof Error ? e.message : "Something went wrong.");
    }
  }

  if (status === "whatsapp") {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-beige-200 p-8 text-center" role="status">
        <CircleCheck className="size-10 text-forest" strokeWidth={1.5} aria-hidden />
        <h3 className="mt-4 text-2xl">Almost done</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          We&apos;ve opened WhatsApp with your details filled in. Just press <strong>send</strong> in WhatsApp and our team will reply.
        </p>
        <a
          href={whatsappLink(enquiryToWhatsApp(getValues()))}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-[#1a7a43] px-6 font-semibold text-white"
        >
          <WhatsAppGlyph className="size-5" /> Open WhatsApp again
        </a>
        <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-sm font-medium text-forest underline underline-offset-4">
          Edit details
        </button>
      </div>
    );
  }

  const full = variant === "full";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4" aria-describedby="form-note">
      <div className={cn("grid gap-4", full && "sm:grid-cols-2")}>
        <Field label="Full Name" required error={errors.name?.message} id="name">
          <input id="name" className="field" autoComplete="name" placeholder="Your name" aria-invalid={!!errors.name} {...register("name")} />
        </Field>
        <Field label="Phone Number" required error={errors.phone?.message} id="phone">
          <input
            id="phone"
            className="field"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="10-digit mobile number"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </Field>
        <Field label="City" required error={errors.city?.message} id="city">
          <select id="city" className="field" aria-invalid={!!errors.city} {...register("city")}>
            <option value="">Select your city</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
            <option>Other town in Andhra Pradesh</option>
            <option>Other area in Hyderabad / Telangana</option>
          </select>
        </Field>
        <Field label="Service Required" required error={errors.service?.message} id="service">
          <select id="service" className="field" aria-invalid={!!errors.service} {...register("service")}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        {full && (
          <>
            <Field label="Email Address" error={errors.email?.message} id="email">
              <input id="email" type="email" className="field" autoComplete="email" placeholder="Optional" aria-invalid={!!errors.email} {...register("email")} />
            </Field>
            <Field label="Property Type" id="propertyType">
              <select id="propertyType" className="field" {...register("propertyType")}>
                <option value="">Optional</option>
                {propertyTypeOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </Field>
            <Field label="Approx. Property Size" id="area">
              <input id="area" className="field" placeholder="e.g. 1,400 sq.ft" {...register("area")} />
            </Field>
            <Field label="Budget Range" id="budget">
              <select id="budget" className="field" {...register("budget")}>
                <option value="">Optional</option>
                {budgetOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </Field>
            <Field label="Project Timeline" id="timeline" className="sm:col-span-2">
              <select id="timeline" className="field" {...register("timeline")}>
                <option value="">Optional</option>
                {timelineOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </Field>
          </>
        )}
      </div>
      <Field label={full ? "Message" : "Your Requirement"} error={errors.message?.message} id="message">
        <textarea
          id="message"
          rows={full ? 4 : 3}
          className="field resize-y"
          placeholder="Tell us about your space and what you'd like to do"
          {...register("message")}
        />
      </Field>

      {/* Honeypot: hidden from people, tempting for bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company <input tabIndex={-1} autoComplete="off" {...register("company")} />
        </label>
      </div>
      <input type="hidden" {...register("sourcePage")} />

      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" className="mt-0.5 size-4 shrink-0 accent-[#102D27]" {...register("consent")} aria-invalid={!!errors.consent} />
        <span>
          I agree to be contacted by Akarsh Interiors by phone or WhatsApp about my enquiry.{" "}
          <a href="/privacy-policy" className="underline underline-offset-2 hover:text-forest">
            Privacy Policy
          </a>
        </span>
      </label>
      {errors.consent && <ErrorText>{errors.consent.message}</ErrorText>}

      {status === "error" && serverError && (
        <div role="alert" className="flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-800">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          <div>
            {serverError}{" "}
            <a href={whatsappLink(enquiryToWhatsApp(getValues()))} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
              Send via WhatsApp instead
            </a>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(
          "inline-flex h-13 items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold transition-colors disabled:opacity-70",
          backendEnabled ? "bg-forest text-ivory hover:bg-forest-700" : "bg-[#1a7a43] text-white hover:bg-[#145f34]",
        )}
      >
        {status === "sending" ? (
          <>
            <LoaderCircle className="size-4 animate-spin" aria-hidden /> Sending…
          </>
        ) : backendEnabled ? (
          <>
            {submitLabel} <Send className="size-4" aria-hidden />
          </>
        ) : (
          <>
            <WhatsAppGlyph className="size-5" /> {submitLabel} via WhatsApp
          </>
        )}
      </button>
      <p id="form-note" className="text-center text-xs text-muted">
        {backendEnabled
          ? "We usually respond within one working day."
          : "Your details are sent to us through WhatsApp — nothing is stored on this website."}
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  id,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  error?: string;
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-forest">
        {label} {required && <span className="text-gold-700">*</span>}
      </label>
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-1.5 text-xs font-medium text-red-700" role="alert">
      <CircleAlert className="size-3.5" aria-hidden /> {children}
    </p>
  );
}
