import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/ScrollReveal";
import { getAllServices, getSiteData } from "@/lib/content";

export default function Home() {
  const siteData = getSiteData();
  const services = getAllServices();

  // Pick the main services from site-data for the grid (first 8)
  const featuredServices = siteData.services.slice(0, 8);

  return (
    <main>
      <Navbar />
      <Hero />

      {/* Services Grid */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="text-xs text-green-500">&#9632;</span>
              <span className="text-sm uppercase tracking-widest text-gray-500">
                Our Services
              </span>
              <span className="text-xs text-green-500">&#9632;</span>
            </div>
            <h2 className="font-heading mb-12 text-center text-4xl uppercase md:text-5xl lg:text-6xl">
              What We Do
            </h2>
          </ScrollReveal>

          <StaggerContainer className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service) => (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/${service.slug}/`}
                  className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#7cda24] hover:shadow-md"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[#7cda24]/10">
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
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-1 text-sm font-bold uppercase tracking-wide">
                    {service.title}
                  </h3>
                  <span className="text-sm text-[#7cda24] opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more &rarr;
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="flex justify-center gap-4">
            <Link
              href="/roof-repairs/"
              className="inline-flex items-center gap-2 rounded bg-black px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-gray-800"
            >
              View All Services
              <span className="text-lg">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <ScrollReveal direction="left">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-xs text-green-500">&#9632;</span>
                  <span className="text-sm uppercase tracking-widest text-gray-500">
                    About Us
                  </span>
                </div>
                <h2 className="font-heading mb-6 text-4xl uppercase md:text-5xl">
                  35+ Years Of Roofing Excellence
                </h2>
                <p className="mb-4 text-gray-600">
                  Sandhurst Roofing has been serving the Frankston and Mornington
                  Peninsula area with quality roofing services for over 35 years.
                  We are a family-owned business committed to delivering
                  professional results on every project.
                </p>
                <p className="mb-6 text-gray-600">
                  From roof restorations and repairs to complete re-roofing, our
                  experienced team handles projects of all sizes. We use only the
                  finest materials and proven techniques to ensure your roof stands
                  the test of time.
                </p>
                <Link
                  href="/about-us/"
                  className="inline-flex items-center gap-2 bg-[#7cda24] px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#6bc11e]"
                >
                  Learn More
                  <span className="text-lg leading-none">&gt;</span>
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                  <p className="font-heading text-4xl text-[#7cda24]">35+</p>
                  <p className="mt-1 text-sm text-gray-500">Years Experience</p>
                </div>
                <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                  <p className="font-heading text-4xl text-[#7cda24]">5000+</p>
                  <p className="mt-1 text-sm text-gray-500">Roofs Completed</p>
                </div>
                <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                  <p className="font-heading text-4xl text-[#7cda24]">100%</p>
                  <p className="mt-1 text-sm text-gray-500">Satisfaction</p>
                </div>
                <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                  <p className="font-heading text-4xl text-[#7cda24]">10yr</p>
                  <p className="mt-1 text-sm text-gray-500">Guarantee</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#7cda24] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="font-heading mb-4 text-4xl uppercase text-white md:text-5xl">
              Ready To Fix Your Roof?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Call us today for a free quote. We service Frankston, Mornington
              Peninsula, and surrounding suburbs.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact/"
                className="inline-flex items-center gap-2 bg-black px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-gray-900"
              >
                Get a Free Quote
                <span className="text-lg leading-none">&gt;</span>
              </Link>
              <a
                href="tel:0448812800"
                className="inline-flex items-center gap-2 border-2 border-white bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-[#7cda24]"
              >
                <svg
                  className="h-4 w-4"
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
                0448 812 800
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
