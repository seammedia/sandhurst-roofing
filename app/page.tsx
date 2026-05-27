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

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
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
      <Blog />
      <FAQ />
      <Footer />
    </main>
  );
}
