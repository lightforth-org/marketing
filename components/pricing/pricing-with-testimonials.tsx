import { trackAction } from "@/lib/ampHelper";
import SpecialOffer from "../special-offer";
import PricingPlan from "./pricing-plan";
import Testimonial from "./testimonial";
import apiService from "@/services/api";
import { useEffect, useState } from "react";

interface PlanData {
  _id: string;
  paymentPlanId: {
    _id: string;
    name: string;
    price: number;
  };
  // Other plan fields not needed for this specific implementation
}

const PricingWithTestimonials = ({
  heading,
  subHeading,
  tagColor,
  selectedPlan,
  setSelectedPlan,
}: {
  heading: string;
  subHeading: string;
  tagColor: string;
  selectedPlan: string;
  setSelectedPlan: (plan: string) => void;
}) => {
  // Add state to store plan data from API
  const [planData, setPlanData] = useState<{
    pro?: PlanData;
    premium?: PlanData;
  }>({});

  // Features for Pro plan - keep static as requested
  const proFeatures = [
    "A+ ATS Resume Builder",
    "AI Cover Letter Generator",
    "100 Job Auto-apply",
    "200 Matched jobs",
    "5 Interview prep & salary negotiation",
    "Interview Co-Pilot",
    "30-day money back guarantee",
  ];

  // Features for Premium plan - keep static as requested
  const premiumFeatures = [
    "A+ ATS Resume Builder",
    "AI Cover Letter Generator",
    "200 Job Auto-apply",
    "300 Matched jobs",
    "5 Interview prep & salary negotiation",
    "Interview Co-Pilot",
    "Exclusive 5+ job offer adoption program",
  ];

  // Fetch plans on component mount
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await apiService.get<{ data: PlanData[] }>(
          "/account/get-all-plans-for-partner",
          {},
          {
            headers: {
              "x-signature": process.env.NEXT_PUBLIC_X_SIGNATURE || "",
            },
          }
        );

        if (
          response &&
          response?.response?.data &&
          Array.isArray(response?.response?.data)
        ) {
          // We only need the pro (index 0) and premium (index 2) plans
          setPlanData({
            pro: response?.response?.data[2],
            premium: response?.response?.data[0],
          });
        }
      } catch (err) {
        console.error("Failed to fetch pricing plans:", err);
        // Silently fail and use fallback URLs if API fails
      }
    };

    fetchPlans();
  }, []);

  // Handle CTA button click with dynamic payment URLs
  const handlePaymentClick = () => {
    // Track analytics as before
    trackAction("QValue_Bump", {
      selectedPlan: selectedPlan,
      planType: selectedPlan === "Pro" ? "Pro" : "Premium",
      price: selectedPlan === "Pro" ? 78.99 : 128.99,
    });

    // Determine which URL to use
    if (selectedPlan === "Pro") {
      if (planData.pro?.paymentPlanId?._id) {
        // Use dynamic URL if plan data is available
        window.open(`/payment/${planData.pro.paymentPlanId._id}`, "_blank");
      } else {
        // Fall back to original URL
        return;
      }
    } else {
      if (planData.premium?.paymentPlanId?._id) {
        // Use dynamic URL if plan data is available
        window.open(`/payment/${planData.premium.paymentPlanId._id}`, "_blank");
      } else {
        // Fall back to original URL
        return;
      }
    }
  };

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
              formerPrice="124.99 USD"
              newPrice="78.99 USD"
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
              formerPrice="254.99 USD"
              newPrice="128.99 USD"
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

        {/* CTA Button - Modified to use dynamic URLs */}
        <div className="mt-8">
          <button
            onClick={handlePaymentClick}
            className="w-full bg-[#0494FC] hover:bg-[#0494fc]/90 cursor-pointer text-white font-bold py-3 px-8 rounded-md transition duration-300"
          >
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
