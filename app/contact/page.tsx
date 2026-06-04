import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { submitContactForm } from "@/app/actions/contact";

export const metadata: Metadata = {
  title: "Contact Us | Get a Free Roofing Quote",
  description:
    "Contact Sandhurst Roofing today. For all your roof restoration, repair and replacement needs, call the team at Sandhurst Roofing.",
  alternates: {
    canonical: "/contact/",
  },
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />

      <section className="bg-black px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-heading text-4xl uppercase text-white md:text-5xl lg:text-6xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Get in touch for a free, no-obligation quote.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <ScrollReveal direction="left">
              <div>
                <h2 className="font-heading mb-8 text-3xl uppercase">
                  Get In Touch
                </h2>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#7cda24]/10">
                      <svg
                        className="h-6 w-6 text-[#7cda24]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Phone</h3>
                      <a
                        href="tel:0448812800"
                        className="text-lg text-[#7cda24] hover:underline"
                      >
                        0448 812 800
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#7cda24]/10">
                      <svg
                        className="h-6 w-6 text-[#7cda24]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Email</h3>
                      <a
                        href="mailto:info@sandhurstroofing.com.au"
                        className="text-[#7cda24] hover:underline"
                      >
                        info@sandhurstroofing.com.au
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#7cda24]/10">
                      <svg
                        className="h-6 w-6 text-[#7cda24]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Address</h3>
                      <p className="text-gray-600">
                        10 Duiker Crt
                        <br />
                        Langwarrin VIC
                      </p>
                    </div>
                  </div>

                  {/* Service Areas */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#7cda24]/10">
                      <svg
                        className="h-6 w-6 text-[#7cda24]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Service Areas</h3>
                      <p className="text-gray-600">
                        Frankston, Mornington Peninsula, Cranbourne, Dandenong,
                        and surrounding suburbs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal direction="right">
              <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                <h2 className="font-heading mb-6 text-2xl uppercase">
                  Request a Free Quote
                </h2>
                <form action={submitContactForm} className="space-y-5">
                  {/* Honeypot field - hidden from real users, bots fill it in.
                      Submissions with a non-empty `website` field are silently dropped server-side. */}
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
                    <label htmlFor="website">
                      Website (leave this empty)
                      <input
                        type="text"
                        id="website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#7cda24] focus:outline-none focus:ring-1 focus:ring-[#7cda24]"
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
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#7cda24] focus:outline-none focus:ring-1 focus:ring-[#7cda24]"
                      />
                    </div>
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
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#7cda24] focus:outline-none focus:ring-1 focus:ring-[#7cda24]"
                    />
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
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#7cda24] focus:outline-none focus:ring-1 focus:ring-[#7cda24]"
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
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#7cda24] focus:outline-none focus:ring-1 focus:ring-[#7cda24]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Service Required
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#7cda24] focus:outline-none focus:ring-1 focus:ring-[#7cda24]"
                    >
                      <option value="">Select a service</option>
                      <option value="roof-restoration">Roof Restoration</option>
                      <option value="roof-repairs">Roof Repairs</option>
                      <option value="re-roofing">Re-Roofing</option>
                      <option value="roof-painting">Roof Painting</option>
                      <option value="guttering">Guttering</option>
                      <option value="colorbond-roofing">
                        Colorbond Roofing
                      </option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell us about your roofing needs..."
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#7cda24] focus:outline-none focus:ring-1 focus:ring-[#7cda24]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#7cda24] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#6bc11e]"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
