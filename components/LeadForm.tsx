import { submitContactForm } from "@/app/actions/contact";

/**
 * Compact lead-capture form for the PPC landing pages.
 *
 * Reuses the same server action as the main contact page, so a submission goes
 * through the identical Resend email + redirect to /thank-you/ (where the Google
 * Ads conversion fires). Two hidden fields tag the lead:
 *   - service: pre-filled so Steve knows the job type without the user picking
 *   - source:  which landing page / campaign produced the lead
 *
 * Fewer fields than the full contact form (message is optional here) to keep
 * friction low on paid traffic. Server-side validation still enforces the
 * essentials (name, phone, email, address).
 */
export default function LeadForm({
  service,
  source,
  heading = "Get Your Free Quote",
  subheading = "Fast, no-obligation quote. We usually reply same day.",
}: {
  service: string;
  source: string;
  heading?: string;
  subheading?: string;
}) {
  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#7cda24] focus:outline-none focus:ring-1 focus:ring-[#7cda24]";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
      <h2 className="font-heading text-2xl uppercase text-gray-900">{heading}</h2>
      <p className="mt-1 text-sm text-gray-500">{subheading}</p>

      <form action={submitContactForm} className="mt-5 space-y-4">
        {/* Honeypot - bots fill this, humans never see it; dropped server-side. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        >
          <label htmlFor={`website-${service}`}>
            Website (leave this empty)
            <input
              type="text"
              id={`website-${service}`}
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        {/* Hidden routing fields */}
        <input type="hidden" name="service" value={service} />
        <input type="hidden" name="source" value={source} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              autoComplete="given-name"
              className={inputClass}
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              autoComplete="family-name"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Phone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            autoComplete="tel"
            inputMode="tel"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            inputMode="email"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Property Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            autoComplete="street-address"
            placeholder="Street, suburb"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Tell us about your roof <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="e.g. tile roof, single storey, gutters overflowing"
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#7cda24] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#6bc11e]"
        >
          Get My Free Quote
        </button>

        <p className="text-center text-xs text-gray-400">
          No spam. Your details are only used to prepare your quote.
        </p>
      </form>
    </div>
  );
}
