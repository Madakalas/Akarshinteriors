import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry";
import type { Enquiry } from "@/lib/types";

/**
 * Receives consultation enquiries.
 * Forwards validated enquiries as JSON to ENQUIRY_WEBHOOK_URL — works with Google Apps Script
 * (Sheets), Zapier, Make, n8n or any CRM webhook. See README → "Connecting the enquiry form".
 */

const hits = new Map<string, { count: number; reset: number }>();
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

function rateLimited(ip: string) {
  const now = Date.now();
  // drop expired entries so the map can't grow without bound
  if (hits.size > 500) for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

export async function POST(req: Request) {
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ error: "Online enquiries are not configured yet. Please contact us on WhatsApp." }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later or WhatsApp us." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    // Honeypot hit: pretend success so bots learn nothing.
    if (typeof body === "object" && body && "company" in body && (body as { company?: string }).company) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Please check the highlighted fields and try again." }, { status: 422 });
  }

  const d = parsed.data;
  const enquiry: Enquiry = {
    id: crypto.randomUUID(),
    name: d.name,
    phone: d.phone,
    email: d.email || undefined,
    city: d.city,
    service: d.service,
    propertyType: d.propertyType || undefined,
    area: d.area || undefined,
    budget: d.budget || undefined,
    timeline: d.timeline || undefined,
    message: d.message || undefined,
    sourcePage: d.sourcePage ?? "unknown",
    createdAt: new Date().toISOString(),
    status: "new",
  };

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ENQUIRY_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_SECRET}` } : {}),
      },
      body: JSON.stringify(enquiry),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("Enquiry delivery failed", err);
    return NextResponse.json({ error: "We couldn't send your enquiry right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, id: enquiry.id });
}
