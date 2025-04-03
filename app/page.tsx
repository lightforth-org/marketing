"use client";
import FeatureSection from "@/components/features";
import Footer from "@/components/footer";
import Goals from "@/components/goals";
import HeroSection from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingWithTestimonials from "@/components/pricing/pricing-with-testimonials";
import RatingsSection from "@/components/ratings";
import TestimonialCarousel from "@/components/testimonials";
import { useRef } from "react";
export default function Home() {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="snap-y snap-mandatory">
      <Navbar onClickScroll={scrollToSection} />
      <main>
        <HeroSection />
        <section ref={sectionRef}>
          <PricingWithTestimonials
            heading="Your Personalized Career Plan"
            subHeading="that makes you the candidate recruiters chase."
            tagColor="#1149A6"
          />
        </section>

        <FeatureSection />
        <RatingsSection />
        <TestimonialCarousel />
        <Goals />

        <PricingWithTestimonials
          heading="Get 5+ job offers in 21 days."
          subHeading="Cancel when you feel like it."
          tagColor="#1149A6"
        />
      </main>
      <Footer />
    </div>
  );
}
