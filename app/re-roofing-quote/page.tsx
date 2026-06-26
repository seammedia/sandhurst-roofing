import type { Metadata } from "next";
import Image from "next/image";
import LandingHeader from "@/components/LandingHeader";
import LandingFooter from "@/components/LandingFooter";
import LeadForm from "@/components/LeadForm";

/**
 * Dedicated PPC landing page for the Re-Roofing / Roof Replacement campaign.
 * noindex,nofollow - this is a paid-traffic page and must NOT compete with the
 * organic /re-roofing/ page or get indexed as thin/duplicate content.
 */
export const metadata: Metadata = {
  title: "Re-Roofing & Roof Replacement Quote",
  description:
    "Free re-roofing and roof replacement quotes across Frankston, the Mornington Peninsula and Melbourne's south-east. 35+ years, COLORBOND® steel. Call 0448 812 800.",
  robots: { index: false, follow: false },
};

const trustChips = [
  "35+ years in the trade",
  "Certified contractor",
  "COLORBOND® steel",
  "Free, no-obligation quotes",
];

const benefits = [
  {
    title: "Fixed-price quotes",
    body: "A clear written price after an on-site inspection. No surprises, no hidden extras once the job starts.",
  },
  {
    title: "Tile or metal, we do it all",
    body: "Old tiles, rusted iron, tired COLORBOND - we strip the old roof and install a new one built to last decades.",
  },
  {
    title: "Family-run, fully insured",
    body: "Local, licensed roof plumbers who turn up when they say they will and leave your property clean.",
  },
  {
    title: "Industry-leading warranty",
    body: "Quality materials and workmanship, backed by a warranty so your new roof is protected for the long haul.",
  },
];

const signs = [
  "Tiles cracking, slipping or letting water through",
  "Rusted or leaking metal sheets",
  "Multiple leaks in different spots after rain",
  "Sagging or damaged roof structure",
  "A roof so old that repairs cost more than replacing it",
  "Planning to sell and want to add value and street appeal",
];

const steps = [
  { n: "1", t: "Free on-site inspection", d: "We assess your roof, talk through options and measure up." },
  { n: "2", t: "Fixed written quote", d: "A clear price and timeframe, with the materials and scope spelled out." },
  { n: "3", t: "We do the work", d: "Old roof off, new roof on, set up to keep water out for decades." },
  { n: "4", t: "Clean and final check", d: "We tidy the site, test the result and walk you through the finished job." },
];

const faqs = [
  {
    q: "How much does re-roofing cost?",
    a: "Every roof is different, so we quote on the actual job after an on-site inspection. The cost of a full re-roof is often comparable to extensive repairs or repainting, and it solves the problem for decades rather than patching it.",
  },
  {
    q: "Do you replace tile roofs with COLORBOND?",
    a: "Yes. Tile-to-tin conversions are one of our most popular jobs. We remove the old tiles and install lightweight COLORBOND® steel, which is durable, low-maintenance and comes in the full colour range.",
  },
  {
    q: "How long does a re-roof take?",
    a: "Most homes are done in a few days depending on size, pitch and access. We give you a timeframe with your quote so you know what to expect.",
  },
  {
    q: "Do you offer free quotes?",
    a: "Yes, every quote is free and without obligation. Call Steve on 0448 812 800 or fill in the form and we will be in touch, usually the same day.",
  },
];

export default function ReRoofingQuotePage() {
  return (
    <main className="bg-white">
      <LandingHeader />

      {/* Hero with form */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:py-16">
        <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-2">
          <div className="text-white">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#7cda24]">
              Frankston · Mornington Peninsula · Melbourne SE
            </p>
            <h1 className="font-heading mt-3 text-4xl uppercase leading-[0.95] sm:text-5xl">
              Re-Roofing &amp; Roof Replacement Done Right
            </h1>
            <p className="mt-4 max-w-xl text-lg text-gray-300">
              Tired tiles or rusted metal? Get a free, fixed-price quote from a
              local, family-run team with 35+ years replacing roofs across
              Melbourne&apos;s south-east in COLORBOND® steel.
            </p>

            <ul className="mt-6 flex flex-wrap gap-3">
              {trustChips.map((chip) => (
                <li
                  key={chip}
                  className="flex items-center gap-2 rounded-full border border-gray-700 px-4 py-1.5 text-sm text-white"
                >
                  <span className="text-[#7cda24]">✓</span>
                  {chip}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="tel:0448812800"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#7cda24] px-7 py-4 text-base font-bold uppercase tracking-wide text-black transition-colors hover:bg-[#6bc41e]"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                Call 0448 812 800
              </a>
              <span className="text-sm text-gray-400">
                or get your quote &rarr;
              </span>
            </div>

            <p className="mt-6 text-sm text-gray-400">
              ★★★★★ Rated 5 stars by local homeowners
            </p>
          </div>

          {/* Lead form */}
          <div id="quote" className="lg:pl-4">
            <LeadForm
              service="re-roofing"
              source="PPC landing: Re-Roofing"
              heading="Get Your Free Re-Roofing Quote"
              subheading="Tell us about your roof and we'll get back to you, usually the same day."
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-heading text-center text-3xl uppercase text-gray-900">
            Why Re-Roof With Sandhurst
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-xl border border-gray-200 p-6"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#7cda24]/10 text-[#7cda24]">
                  ✓
                </div>
                <h3 className="font-bold text-gray-900">{b.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signs + image */}
      <section className="bg-gray-50 px-4 py-14 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl uppercase text-gray-900">
              Signs It&apos;s Time to Re-Roof
            </h2>
            <p className="mt-3 text-gray-600">
              If any of these sound familiar, it&apos;s worth getting us out for a
              free look before the next big downpour:
            </p>
            <ul className="mt-6 space-y-3">
              {signs.map((s) => (
                <li key={s} className="flex items-start gap-3 text-gray-700">
                  <span className="mt-1 text-[#7cda24]">✓</span>
                  {s}
                </li>
              ))}
            </ul>
            <a
              href="#quote"
              className="mt-8 inline-block rounded-lg bg-[#7cda24] px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#6bc11e]"
            >
              Get My Free Quote
            </a>
          </div>
          <div className="overflow-hidden rounded-xl">
            <Image
              src="/images/hero-aerial-wide.png"
              alt="Aerial view of a restored COLORBOND steel roof by Sandhurst Roofing"
              width={1448}
              height={1086}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-heading text-center text-3xl uppercase text-gray-900">
            How It Works
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="rounded-xl border border-gray-200 p-6">
                <div className="font-heading flex h-10 w-10 items-center justify-center rounded-full bg-black text-lg text-[#7cda24]">
                  {s.n}
                </div>
                <h3 className="mt-4 font-bold text-gray-900">{s.t}</h3>
                <p className="mt-2 text-sm text-gray-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-gray-50 px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-3xl uppercase text-gray-900">
            What Our Customers Say
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <blockquote className="rounded-xl border border-gray-200 bg-white p-6 text-left">
              <p className="text-[#7cda24]">★★★★★</p>
              <p className="mt-2 text-gray-700">
                Matt and his guys did a great job restoring our tile roof. Great
                communication from start to finish. Great result and very
                reasonable price.
              </p>
              <cite className="mt-3 block text-sm font-semibold not-italic text-gray-900">
                — Ben Prout
              </cite>
            </blockquote>
            <blockquote className="rounded-xl border border-gray-200 bg-white p-6 text-left">
              <p className="text-[#7cda24]">★★★★★</p>
              <p className="mt-2 text-gray-700">
                An excellent job with dedicated staff. Steve was most helpful and
                assisted where possible.
              </p>
              <cite className="mt-3 block text-sm font-semibold not-italic text-gray-900">
                — Steve Perera
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-center text-3xl uppercase text-gray-900">
            Re-Roofing FAQs
          </h2>
          <div className="mt-8 space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900">{f.q}</h3>
                <p className="mt-2 text-sm text-gray-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#7cda24] px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="font-heading text-2xl uppercase text-white md:text-3xl">
              Ready for a New Roof?
            </h2>
            <p className="text-white/90">
              Free, no-obligation quote. We usually reply the same day.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:0448812800"
              className="inline-flex items-center justify-center gap-2 border-2 border-white bg-transparent px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-[#7cda24]"
            >
              Call 0448 812 800
            </a>
            <a
              href="#quote"
              className="inline-flex items-center justify-center gap-2 bg-black px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-gray-900"
            >
              Get My Free Quote
            </a>
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
