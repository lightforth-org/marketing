/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import FAQSection from '@/components/faqSection';
// import FeatureSection from '@/components/features';
// import Footer from '@/components/footer';
// import Goals from '@/components/goals';
import HeroSection from '@/components/hero';
import Navbar from '@/components/navbar';
import NewFeaturesSection from '@/components/newFeatures';
import PricingWithTestimonials from '@/components/pricing/pricing-with-testimonials';
import GuaranteeSection from '@/components/pricing/testimonialCard';
// import RatingsSection from '@/components/ratings';
import ResultsGallerySection from '@/components/resultPage';
// import TestimonialCarousel from '@/components/testimonials';
import VideoCarousel from '@/components/videoCarousel';
import * as amplitude from '@amplitude/analytics-browser';
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser';
import { useEffect, useRef, useState } from 'react';
import { TbLoader2 } from 'react-icons/tb';

export default function Home() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>('Pro');

  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const authorizerId = params.get('authorizerId');
  //   const contactId = params.get('contactId');
  //   const funnel = params.get('funnel');

  //   if (
  //     funnel !== 'quiz' ||
  //     [authorizerId, contactId].includes(null) ||
  //     [authorizerId, contactId].includes('undefined')
  //   ) {
  //     setTimeout(() => {
  //       window.location.href = 'https://quiz.lightforth.org';
  //     }, 2000); // Simulate a delay for loading
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, []);

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

    if (process.env.NODE_ENV !== 'development') {
      amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE as string, options);
      console.log('Amplitude Device ID:', amplitude.getDeviceId());
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <TbLoader2 className="animate-spin text-blue-400 text-3xl" />
        </div>
      </div>
    );
  }

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="snap-y snap-mandatory">
      <Navbar onClickScroll={scrollToSection} />
      <main className="px-3 md:px-0">
        <HeroSection onClickScroll={scrollToSection} />
        <VideoCarousel />
        <NewFeaturesSection onClickScroll={scrollToSection} />
        <section ref={sectionRef}>
          <PricingWithTestimonials
            heading="Your Personalized Career Plan"
            subHeading="that makes you the candidate recruiters chase."
            tagColor="#1149A6"
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />
        </section>

        {/* <FeatureSection /> */}
        <GuaranteeSection />
        {/* <RatingsSection /> */}
        {/* <TestimonialCarousel /> */}
        <ResultsGallerySection />
        {/* <Goals /> */}

        <PricingWithTestimonials
          heading="Get 5+ job offers in 21 days."
          subHeading="Cancel when you feel like it."
          tagColor="#1149A6"
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />
        <FAQSection />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
