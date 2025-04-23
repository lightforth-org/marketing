"use client";
import FeatureSection from "@/components/features";
import Footer from "@/components/footer";
import Goals from "@/components/goals";
import HeroSection from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingWithTestimonials from "@/components/pricing/pricing-with-testimonials";
import RatingsSection from "@/components/ratings";
import TestimonialCarousel from "@/components/testimonials";
import { useRef, useState, useEffect } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";

export default function Home() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>("Pro");

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const sessionReplayTracking = sessionReplayPlugin();
    amplitude.add(sessionReplayTracking);

    const options = {
      autocapture: {
        attribution: false,
        pageViews: true,
        sessions: true,
        formInteractions: false,
        fileDownloads: true,
        elementInteractions: false,
      },
      defaultTracking: {
        sessions: true,
      },
    };

    if (process.env.NODE_ENV !== "development") {
      amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE as string, options);
      console.log("Amplitude Device ID:", amplitude.getDeviceId());
    }
  }, []);

  return (
    <div className="snap-y snap-mandatory">
      <Navbar onClickScroll={scrollToSection} />
      <main className="px-3 md:px-0">
        <HeroSection />
        <section ref={sectionRef}>
          <PricingWithTestimonials
            heading="Your Personalized Career Plan"
            subHeading="that makes you the candidate recruiters chase."
            tagColor="#1149A6"
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
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
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />
      </main>
      <Footer />
    </div>
  );
}
