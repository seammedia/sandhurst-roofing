import Link from "next/link";
import { sanitizeHtml } from "@/lib/sanitize";

interface ContentPageProps {
  title: string;
  content: string;
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: string | null;
  sidebar?: React.ReactNode;
}

export default function ContentPage({
  title,
  content,
  featuredImage,
  sidebar,
}: ContentPageProps) {
  const cleanContent = sanitizeHtml(content);

  return (
    <div className="bg-white">
      {/* Hero / Header */}
      <section className="relative bg-black py-16 sm:py-24">
        {featuredImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${featuredImage})` }}
          />
        )}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl uppercase text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <div className="mt-4 h-1 w-24 bg-[#7cda24]" />
        </div>
      </section>

      {/* Content Area */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div
          className={`gap-12 ${sidebar ? "grid lg:grid-cols-[1fr_320px]" : ""}`}
        >
          {/* Main Content */}
          <article
            className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:uppercase prose-headings:text-gray-900 prose-a:text-[#7cda24] prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: cleanContent }}
          />

          {/* Sidebar */}
          {sidebar && (
            <aside className="space-y-8 lg:sticky lg:top-8 lg:self-start">
              {sidebar}
            </aside>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl uppercase text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Call Steve today for a friendly chat and a competitive quote. We
            provide free onsite inspections across Melbourne's south east.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:0448812800"
              className="inline-flex items-center gap-2 rounded-lg bg-[#7cda24] px-8 py-4 text-lg font-bold text-black transition hover:bg-[#6bc21e]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              0448 812 800
            </a>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-[#7cda24] px-8 py-4 text-lg font-bold text-[#7cda24] transition hover:bg-[#7cda24] hover:text-black"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
