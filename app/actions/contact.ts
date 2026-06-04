"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";

/**
 * Submit the contact form, send via Resend, redirect to /thank-you.
 *
 * Environment variables (set in Vercel project settings):
 *   - RESEND_API_KEY     (required, starts with "re_")
 *   - CONTACT_TO_EMAIL   (optional, default: info@sandhurstroofing.com.au)
 *   - CONTACT_FROM_EMAIL (optional, default: noreply@sandhurstroofing.com.au)
 *                        Must be a domain verified in Resend.
 *
 * If RESEND_API_KEY is missing, the action throws so deployment surfaces the
 * configuration gap immediately instead of silently dropping leads.
 */
export async function submitContactForm(formData: FormData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing RESEND_API_KEY environment variable. Form submission cannot be delivered."
    );
  }

  // Extract + lightly normalise fields. The form already enforces `required` on the client side.
  const firstName = String(formData.get("firstName") || "").trim();
  const lastName = String(formData.get("lastName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const service = String(formData.get("service") || "").trim();
  const message = String(formData.get("message") || "").trim();
  // Honeypot field - bots fill in everything; humans never see this field.
  const honeypot = String(formData.get("website") || "").trim();

  // Drop bot submissions silently (still redirect to look identical to a real submission).
  if (honeypot) {
    redirect("/thank-you/");
  }

  // Server-side validation (the source of truth - client validation is just UX).
  if (!firstName || !lastName || !email || !phone || !address || !message) {
    throw new Error("All required fields must be completed.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email address.");
  }
  if (message.length > 5000) {
    throw new Error("Message is too long (5000 characters max).");
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || "info@sandhurstroofing.com.au";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "noreply@sandhurstroofing.com.au";

  const resend = new Resend(apiKey);

  const subject = `New website enquiry from ${firstName} ${lastName}${
    service ? ` (${service})` : ""
  }`;

  const text = [
    `New enquiry via sandhurstroofing.com.au contact form`,
    "",
    `Name:    ${firstName} ${lastName}`,
    `Email:   ${email}`,
    `Phone:   ${phone}`,
    `Address: ${address}`,
    `Service: ${service || "(not specified)"}`,
    "",
    "Message:",
    message,
    "",
    "----",
    `Reply directly to this email to respond to ${email}.`,
  ].join("\n");

  const html = `
    <h2>New website enquiry</h2>
    <p><strong>From:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
    <p><strong>Email:</strong> <a href="mailto:${encodeURIComponent(email)}">${escapeHtml(email)}</a></p>
    <p><strong>Phone:</strong> <a href="tel:${encodeURIComponent(phone)}">${escapeHtml(phone)}</a></p>
    <p><strong>Property address:</strong> ${escapeHtml(address)}</p>
    <p><strong>Service:</strong> ${escapeHtml(service || "(not specified)")}</p>
    <h3>Message</h3>
    <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    <hr>
    <p style="color: #666; font-size: 12px;">
      Sent from the contact form at sandhurstroofing.com.au.
      Reply directly to this email to respond to the customer.
    </p>
  `;

  const { error } = await resend.emails.send({
    from: `Sandhurst Roofing Website <${fromEmail}>`,
    to: [toEmail],
    replyTo: email,
    subject,
    text,
    html,
  });

  if (error) {
    // Surface the failure to the user (Next.js Server Action error UI) and to logs.
    // We do NOT swallow this - silent failures are worse than visible ones.
    console.error("[contact form] Resend error:", error);
    throw new Error(
      "We couldn't send your message. Please try again or call us on 0448 812 800."
    );
  }

  // Redirect on success - status code 308 by default for Server Actions
  redirect("/thank-you/");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
