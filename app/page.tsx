import FeatureSection from "@/components/features";
import Footer from "@/components/footer";
import Goals from "@/components/goals";
import HeroSection from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingWithTestimonials from "@/components/pricing/pricing-with-testimonials";
import RatingsSection from "@/components/ratings";
import TestimonialCarousel from "@/components/testimonials";
export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <HeroSection />
        <PricingWithTestimonials
          heading="Your Personalized Career Plan"
          subHeading="that makes you the candidate recruiters chase."
          tagColor="#1149A6"
        />
        <FeatureSection />
        <RatingsSection />
        <TestimonialCarousel />
        <Goals />
        <PricingWithTestimonials
          heading="Get 5+ job offers in 21 days."
          subHeading="Cancel when you feel like it."
          tagColor="#00857A"
        />
      </main>
      <Footer />
    </div>
  );
}
