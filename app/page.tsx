import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutUs from "@/components/AboutUs";
import HowWeWork from "@/components/HowWeWork";
import Reviews from "@/components/Reviews";
import RoofingTypes from "@/components/RoofingTypes";
import Blog from "@/components/Blog";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/content";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  // Pull the 3 most recent blog posts (sorted by date desc in getAllPosts) so
  // the homepage Blog section reflects real content + links to real /blog/[slug]/.
  const recentPosts = getAllPosts().slice(0, 3).map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    categories: p.categories,
    featuredImage: p.featuredImage,
  }));

  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <WhyChooseUs />
      <AboutUs />
      <HowWeWork />
      <Reviews />
      <RoofingTypes />
      <Blog posts={recentPosts} />
      <FAQ />
      <Footer />
    </main>
  );
}
