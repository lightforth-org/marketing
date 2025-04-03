import { useState } from "react";
import SpecialOffer from "../special-offer";
import PricingPlan from "./pricing-plan";
import Testimonial from "./testimonial";

const PricingWithTestimonials = ({
  heading,
  subHeading,
  tagColor,
}: {
  heading: string;
  subHeading: string;
  tagColor: string;
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string>("Pro");

  // Features for Pro plan
  const proFeatures = [
    "A+ ATS Resume Builder",
    "AI Cover Letter Generator",
    "100 Job Auto-apply",
    "200 Matched jobs",
    "5 Interview prep & salary negotiation",
    "Interview Co-Pilot",
    "30-day money back guarantee",
  ];

  // Features for Premium plan
  const premiumFeatures = [
    "A+ ATS Resume Builder",
    "AI Cover Letter Generator",
    "200 Job Auto-apply",
    "300 Matched jobs",
    "5 Interview prep & salary negotiation",
    "Interview Co-Pilot",
    "Exclusive 5+ job offer adoption program",
  ];

  return (
    <div className="bg-white py-12 md:py-16">
      {/* Holiday Offer Banner */}
      <SpecialOffer />
      <div className="md:max-w-4xl mx-auto sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center mb-5 lg:mb-12">
          <h2 className="text-2xl md:text-4xl font-semibold text-[#0494FC] lg:mb-1">
            {heading}
          </h2>
          <p className="text-2xl md:text-4xl font-semibold text-gray-800">
            {subHeading}
          </p>
        </div>

        {/* Pricing Comparison Table */}
        <div className="flex flex-col gap-y-5 md:flex-row gap-x-5">
          {/* Pro Plan */}
          <div className="w-full space-y-5">
            <PricingPlan
              type="30 day Pro"
              perDay="2.63"
              formerPrice="254.99 USD"
              newPrice="119.99 USD"
              features={proFeatures}
              tagColor={tagColor}
              isSelected={selectedPlan === "Pro"}
              onClick={() => setSelectedPlan("Pro")}
            />
            <Testimonial
              quote='"I kept getting a headache wondering which company to choose from 9 job offers. Stay or go ahead!"'
              role="Product Manager"
              company="Quantum Finance"
              imageSrc="/images/female.png"
            />
          </div>

          {/* Premium Plan */}
          <div className="w-full space-y-5">
            <PricingPlan
              type="30 day Premium"
              perDay="3.99"
              formerPrice="124.99 USD"
              newPrice="78.99 USD"
              isPopular={true}
              features={premiumFeatures}
              tagColor={tagColor}
              isSelected={selectedPlan === "Premium"}
              onClick={() => setSelectedPlan("Premium")}
            />
            <Testimonial
              quote='"I got 9 job offers but I needed a salary higher than $200K/year. This was the plan that gave me that."'
              role="Chief Marketing Officer"
              company="Chase"
              imageSrc="/images/male.png"
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8">
          <button className="w-full bg-[#0494FC] hover:bg-[#0494fc]/90 cursor-pointer text-white font-bold py-3 px-8 rounded-md transition duration-300">
            Start getting jobs, cancel anytime
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            30-day money-back guarantee
          </p>
        </div>

        {/* Fine Print */}
        <div className="mt-8 text-xs text-gray-300 text-center">
          <p>
            By continuing, you agree to pay 78.99USD for your plan and agree
            that if you don&apos;t cancel at least 6 days prior to the end of
            the one-week introductory offer, you will automatically be charged
            the full price of 78.99 USD every month until you cancel in
            Settings. Learn more about our cancellation and refund policy in the
            Subscription Terms
          </p>
          <p className="mt-10 max-w-lg mx-auto">
            By continuing, I agree that my credit/debit card data will be stored
            and used for repeated purchase attempts in the event of payment
            failure
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingWithTestimonials;
