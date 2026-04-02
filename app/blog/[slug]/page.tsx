import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPost, getAllPosts, getSiteData } from "@/lib/content";
import { sanitizeHtml } from "@/lib/sanitize";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = getPost(slug);
    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || "",
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = getPost(slug);
  } catch {
    notFound();
  }

  const siteData = getSiteData();
  const allPosts = getAllPosts();
  const recentPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 5);

  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="bg-black px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {post.categories.map((cat) => (
              <span
                key={cat}
                className="rounded bg-[#7cda24]/20 px-3 py-1 text-xs font-medium text-[#7cda24]"
              >
                {cat}
              </span>
            ))}
          </div>
          <h1 className="font-heading text-3xl uppercase text-white md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <time className="mt-4 block text-sm text-gray-400">
            {new Date(post.date).toLocaleDateString("en-AU", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div
                className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:uppercase prose-a:text-[#7cda24] prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(post.content),
                }}
              />

              {/* Back to blog */}
              <div className="mt-12 border-t border-gray-200 pt-8">
                <Link
                  href="/blog/"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#7cda24] hover:underline"
                >
                  &larr; Back to Blog
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Phone CTA */}
                <div className="rounded-lg bg-black p-6 text-center">
                  <p className="mb-2 text-sm uppercase tracking-wider text-gray-400">
                    Need Roofing Help?
                  </p>
                  <a
                    href="tel:0448812800"
                    className="font-heading block text-3xl text-[#7cda24]"
                  >
                    0448 812 800
                  </a>
                </div>

                {/* Recent Posts */}
                <div className="rounded-lg border border-gray-200 p-6">
                  <h3 className="font-heading mb-4 text-lg uppercase">
                    Recent Posts
                  </h3>
                  <ul className="space-y-3">
                    {recentPosts.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/blog/${p.slug}/`}
                          className="block text-sm text-gray-600 transition-colors hover:text-[#7cda24]"
                        >
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services List */}
                <div className="rounded-lg border border-gray-200 p-6">
                  <h3 className="font-heading mb-4 text-lg uppercase">
                    Our Services
                  </h3>
                  <ul className="space-y-2">
                    {siteData.services.slice(0, 8).map((service) => (
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

                {/* Get a Quote */}
                <Link
                  href="/contact/"
                  className="block w-full bg-[#7cda24] px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#6bc11e]"
                >
                  Get a Free Quote &gt;
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
