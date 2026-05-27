import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getService,
  getLocation,
  getPage,
  getAllServices,
  getAllLocations,
  getSiteData,
} from "@/lib/content";
import { sanitizeHtml } from "@/lib/sanitize";

// Pages that have their own dedicated routes - skip them here
const RESERVED_SLUGS = ["blog", "faq", "contact", "thank-you"];

type PageContent = {
  title: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  type: "service" | "location" | "page";
};

function loadContent(slug: string): PageContent | null {
  // Try service first
  try {
    const data = getService(slug);
    return { ...data, type: "service" };
  } catch {
    // not a service
  }

  // Try location
  try {
    const data = getLocation(slug);
    return { ...data, type: "location" };
  } catch {
    // not a location
  }

  // Try page
  try {
    const data = getPage(slug);
    return { ...data, type: "page" };
  } catch {
    // not a page
  }

  return null;
}

export async function generateStaticParams() {
  const siteData = getSiteData();

  const serviceSlugs = siteData.services.map((s) => ({ slug: s.slug }));
  const locationSlugs = siteData.locations.map((l) => ({ slug: l.slug }));

  // Add core pages (excluding reserved ones that have dedicated routes)
  const corePages = [
    "about-us",
    "colorbond-colour-chart",
    "colour-tools",
    "colour-visualisation-tool",
    "covid-19",
    "home",
    "privacy-policy",
    "recent-jobs",
    "reviews",
    "service-areas",
    "terms",
  ].map((slug) => ({ slug }));

  return [...serviceSlugs, ...locationSlugs, ...corePages];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (RESERVED_SLUGS.includes(slug)) {
    return {};
  }

  const content = loadContent(slug);
  if (!content) {
    return {};
  }

  return {
    title: content.seoTitle || content.title,
    description: content.seoDescription || "",
    alternates: {
      canonical: `/${slug}/`,
    },
  };
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (RESERVED_SLUGS.includes(slug)) {
    notFound();
  }

  const content = loadContent(slug);
  if (!content) {
    notFound();
  }

  const siteData = getSiteData();

  return (
    <main>
      <Navbar />

      <section className="bg-black px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-heading text-4xl uppercase text-white md:text-5xl lg:text-6xl">
            {content.title}
          </h1>
          {content.type === "location" && (
            <p className="mt-4 text-lg text-gray-400">
              Professional roofing services in {content.title}
            </p>
          )}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div
                className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:uppercase prose-a:text-[#7cda24] prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(content.content),
                }}
              />
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Phone CTA */}
                <div className="rounded-lg bg-black p-6 text-center">
                  <p className="mb-2 text-sm uppercase tracking-wider text-gray-400">
                    Call Us Today
                  </p>
                  <a
                    href="tel:0448812800"
                    className="font-heading block text-3xl text-[#7cda24]"
                  >
                    0448 812 800
                  </a>
                  <p className="mt-2 text-sm text-gray-400">
                    Free quotes available
                  </p>
                </div>

                {/* Get a Quote Button */}
                <Link
                  href="/contact/"
                  className="block w-full bg-[#7cda24] px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#6bc11e]"
                >
                  Get a Free Quote &gt;
                </Link>

                {/* Services List */}
                <div className="rounded-lg border border-gray-200 p-6">
                  <h3 className="font-heading mb-4 text-lg uppercase">
                    Our Services
                  </h3>
                  <ul className="space-y-2">
                    {siteData.services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/${service.slug}/`}
                          className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-[#7cda24]"
                        >
                          <span className="text-xs text-[#7cda24]">
                            &rsaquo;
                          </span>
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#7cda24] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <h2 className="font-heading text-2xl uppercase text-white md:text-3xl">
              Need Roofing Help?
            </h2>
            <p className="text-white/90">
              Call us for a free, no-obligation quote.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="tel:0448812800"
              className="inline-flex items-center gap-2 border-2 border-white bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-[#7cda24]"
            >
              0448 812 800
            </a>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 bg-black px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-gray-900"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
