/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import FAQSection from "@/components/faqSection";
import { Suspense } from "react";
// import FeatureSection from '@/components/features';
// import Footer from '@/components/footer';
// import Goals from '@/components/goals';
import HeroSection from "@/components/hero";
import Navbar from "@/components/navbar";
// import RatingsSection from '@/components/ratings';
// import TestimonialCarousel from '@/components/testimonials';
import Footer from "@/components/footer";
import Gurantee from "@/components/gurantee";
import PageLoader from "@/components/page-loader";
import RatingsSection from "@/components/ratings";
import TestimonialCarousel from "@/components/testimonials";
import VideoCarousel from "@/components/videoCarousel";
import * as amplitude from "@amplitude/analytics-browser";
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";
import { useEffect, useRef, useState } from "react";

export default function Home() {
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

  const scrollToSection = () => {
    window.open(`https://www.app.lightforth.org/auth/login`, "_self");
  };

  return (
    <Suspense fallback={<PageLoader />}>
      <div className="snap-y snap-mandatory">
        <Navbar onClickScroll={scrollToSection} />
        <main className="px-3 md:px-0">
          <HeroSection onClickScroll={scrollToSection} />
          {/* <section ref={sectionRef}>
            <Suspense
              fallback={
                <div className="flex justify-center items-center p-8">
                  <TbLoader2 className="animate-spin text-blue-400 text-3xl" />
                </div>
              }
            >
              <PricingWithTestimonials
                heading="Your Personalized Career Plan"
                subHeading="that makes you the candidate recruiters chase."
                tagColor="#1149A6"
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
              />
            </Suspense>
          </section> */}

          <VideoCarousel />
          <Gurantee />

          {/* <FeatureSection /> */}
          {/* <GuaranteeSection /> */}

          <TestimonialCarousel />
          <RatingsSection />
          {/* <ResultsGallerySection /> */}
          {/* <Goals /> */}
          {/*
          <section ref={sectionRef}>
            <Suspense
              fallback={
                <div className="flex justify-center items-center p-8">
                  <TbLoader2 className="animate-spin text-blue-400 text-3xl" />
                </div>
              }
            >
              <PricingWithTestimonials
                heading="Your Personalized Career Plan"
                subHeading="that makes you the candidate recruiters chase."
                tagColor="#1149A6"
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
              />
            </Suspense>
          </section> */}
          <FAQSection onClickScroll={scrollToSection} />
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}
