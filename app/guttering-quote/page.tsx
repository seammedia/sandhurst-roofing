import type { Metadata } from "next";
import Image from "next/image";
import LandingHeader from "@/components/LandingHeader";
import LandingFooter from "@/components/LandingFooter";
import LeadForm from "@/components/LeadForm";

/**
 * Dedicated PPC landing page for the Guttering campaign (new gutters, gutter
 * replacement, downpipes, fascia). noindex,nofollow so it does not compete with
 * the organic /guttering/ and /gutter-replacement/ pages.
 */
export const metadata: Metadata = {
  title: "Guttering & Gutter Replacement Quote",
  description:
    "Free guttering quotes across Frankston, the Mornington Peninsula and Melbourne's south-east. New gutters, replacement, downpipes and fascia in COLORBOND® steel. Call 0448 812 800.",
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
    title: "Most jobs done in a day",
    body: "Old gutters off, new COLORBOND® steel gutters on, set to the right fall and cleaned up - usually in a single day.",
  },
  {
    title: "Gutters, downpipes & fascia",
    body: "We handle the whole job, including replacing or capping rotten fascia so the new gutter has a sound fixing.",
  },
  {
    title: "Fixed price up front",
    body: "A clear, fixed quote after we measure up. No nasty surprises once the work is underway.",
  },
  {
    title: "Stops the water damage",
    body: "Failing gutters rot fascia, stain walls and leak into the roof. New guttering keeps water where it belongs.",
  },
];

const signs = [
  "Rust holes, flaking paint or rust stains down the fascia and walls",
  "Gutters sagging or pulling away from the roofline",
  "Water overflowing the front edge every time it rains, even when clear",
  "Cracked or split seams and joints that keep leaking after repair",
  "Rotten or soft timber fascia behind the gutter",
  "Several patched sections where one more repair is throwing good money after bad",
];

const steps = [
  { n: "1", t: "Free on-site inspection", d: "We measure up, check the fascia and downpipe layout and quote accurately." },
  { n: "2", t: "Fixed written quote", d: "A clear price for the gutters, downpipes and any fascia work needed." },
  { n: "3", t: "Install new guttering", d: "Old gutters removed and taken away, new COLORBOND® steel fitted to the right fall." },
  { n: "4", t: "Test and clean up", d: "We connect the downpipes, test the run and leave no mess behind." },
];

const faqs = [
  {
    q: "How much does gutter replacement cost?",
    a: "It depends on the length of guttering, number of downpipes, single or double storey, the gutter profile and whether any fascia needs replacing. We give you a clear, fixed price up front after an on-site measure.",
  },
  {
    q: "Should I repair or replace my gutters?",
    a: "If the guttering is sound and the problem is a single leak or blockage, a repair is fine. Once there is widespread rust, sagging or repeated leaks, replacement is the better value. We'll give you an honest recommendation.",
  },
  {
    q: "Do you replace the fascia too?",
    a: "Yes. If the timber fascia behind the gutter has rotted we can replace it or cap it in COLORBOND® so your new guttering has a sound, long-lasting fixing.",
  },
  {
    q: "Do you offer free quotes?",
    a: "Yes, every quote is free and without obligation. Call Steve on 0448 812 800 or fill in the form and we'll be in touch, usually the same day.",
  },
];

export default function GutteringQuotePage() {
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
              New Gutters &amp; Gutter Replacement
            </h1>
            <p className="mt-4 max-w-xl text-lg text-gray-300">
              Rusted, sagging or overflowing gutters? Get a free, fixed-price
              quote on new COLORBOND® steel guttering, downpipes and fascia from a
              local team with 35+ years on the tools.
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
              service="guttering"
              source="PPC landing: Guttering"
              heading="Get Your Free Guttering Quote"
              subheading="Tell us about your gutters and we'll get back to you, usually the same day."
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-heading text-center text-3xl uppercase text-gray-900">
            Why Choose Sandhurst for Guttering
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
              Signs It&apos;s Time to Replace Your Gutters
            </h2>
            <p className="mt-3 text-gray-600">
              Once gutters reach the end of their life, replacing them is cheaper
              over time than patching. Get us out for a free look if you see:
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
              src="/images/wp/2018/07/guttering-pic2-e1532576127740.png"
              alt="New COLORBOND steel guttering and downpipes installed by Sandhurst Roofing"
              width={995}
              height={710}
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
                Wonderful service. Prompt and professional. Highly recommended and
                thank you Steve.
              </p>
              <cite className="mt-3 block text-sm font-semibold not-italic text-gray-900">
                — Samantha Shaw
              </cite>
            </blockquote>
            <blockquote className="rounded-xl border border-gray-200 bg-white p-6 text-left">
              <p className="text-[#7cda24]">★★★★★</p>
              <p className="mt-2 text-gray-700">
                Best service ever. Great team and a trouble free experience. Give
                these guys a go. Brilliant.
              </p>
              <cite className="mt-3 block text-sm font-semibold not-italic text-gray-900">
                — Steve Wood
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-center text-3xl uppercase text-gray-900">
            Guttering FAQs
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
              Ready for New Gutters?
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
