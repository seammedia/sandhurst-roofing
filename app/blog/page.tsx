import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/ScrollReveal";
import { getAllPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Roofing Blog | Tips & Advice",
  description:
    "Read our latest roofing tips, advice, and industry insights. Learn about roof restoration, repairs, and maintenance from Melbourne's trusted roofers.",
  alternates: {
    canonical: "/blog/",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      <Navbar />

      <section className="bg-black px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-heading text-4xl uppercase text-white md:text-5xl lg:text-6xl">
            Roofing Blog
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Tips, advice, and insights from our roofing experts.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <StaggerContainer className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  href={`/blog/${post.slug}/`}
                  className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                >
                  {/* Featured Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gray-200">
                        <svg
                          className="h-12 w-12 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Date & Categories */}
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <time className="text-xs text-gray-500">
                        {new Date(post.date).toLocaleDateString("en-AU", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      {post.categories.slice(0, 2).map((cat) => (
                        <span
                          key={cat}
                          className="rounded bg-[#7cda24]/10 px-2 py-0.5 text-xs font-medium text-[#7cda24]"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    <h2 className="mb-2 text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#7cda24]">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="line-clamp-3 text-sm text-gray-600">
                        {post.excerpt}
                      </p>
                    )}

                    <span className="mt-3 inline-block text-sm font-medium text-[#7cda24]">
                      Read more &rarr;
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <Footer />
    </main>
  );
}
