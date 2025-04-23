// @ts-nocheck
import { trackAction } from "@/lib/ampHelper";
import SpecialOffer from "../special-offer";
import PricingPlan from "./pricing-plan";
import Testimonial from "./testimonial";
import apiService from "@/services/api";
import { useEffect, useState } from "react";
import Image from "next/image";

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
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-[#0494FC] mb-1">
            Choose a plan
          </h1>
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">
            No commitment. Cancel anytime
          </h2>
          <div className="flex flex-col items-center space-y-2 mt-6">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-600">3 days free first purchase</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-600">No upfront payment required</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-600">
                Cancel anytime before your trial ends
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Comparison Table */}
        <div className="flex flex-col gap-y-5 md:flex-row gap-x-5">
          {/* Pro Plan */}
          <div className="w-full space-y-5">
            <PricingPlan
              isPopular={true}
              formerPrice="$97"
              newPrice="$79"
              perMonth="/month"
              isSelected={selectedPlan === "Pro"}
              onClick={() => setSelectedPlan("Pro")}
              features={[
                "A+ ATS Resume Builder",
                "3 AI Cover Letter Generator",
                "50 Auto-apply Jobs",
                "50 Recommeded jobs",
                "3 Interview Prep sessions",
                "3 Interview Co-Pilot sessions",
              ]}
            />
            <Testimonial
              quote='"I kept getting a headache wondering which company to choose from 9 job offers. Stay or go ahead!"'
              role="Product Manager"
              company="Quantum Finance"
              imageSrc="/images/female.png"
            />
          </div>

          <div className="w-full space-y-5">
            {/* Premium Plan */}
            <PricingPlan
              isBestValue={true}
              formerPrice="$199"
              newPrice="$129"
              perMonth="/month"
              isSelected={selectedPlan === "Premium"}
              onClick={() => setSelectedPlan("Premium")}
              features={[
                "A+ ATS Resume Builder",
                "5 AI Cover Letter Generator",
                "100 Auto-apply Jobs",
                "150 Recommeded jobs",
                "5 Interview Prep sessions",
                "5 Interview Co-Pilot sessions",
              ]}
            />
            <Testimonial
              quote='"I got 9 job offers but I needed a salary higher than $200K/year. This was the plan that gave me that."'
              role="Chief Marketing Officer"
              company="Chase"
              imageSrc="/images/male.png"
            />
          </div>
        </div>
      </div>

      {/* CTA Button - Modified to use dynamic URLs */}
      <div className="mt-8 w-full mx-auto md:max-w-xl">
        <button
          onClick={handlePaymentClick}
          className="w-full bg-[#0494FC] hover:bg-[#0494fc]/90 cursor-pointer text-white font-bold py-3 px-8 rounded-md transition duration-300"
        >
          Start getting jobs, cancel anytime
        </button>
        <div className="w-full mt-5 flex flex-col md:flex-row items-center md:items-start mx-auto text-center justify-center">
          <p className="text-sm text-gray-500 ">We accept:</p>
          <Image
            src={"/images/gateways.png"}
            alt="Payment gateways"
            width={393}
            height={85}
          />
        </div>
      </div>

      {/* Fine Print */}
      <div className="max-w-5xl mx-auto mt-8 text-xs text-[#C2C2C2] text-center">
        <p>
          By continuing, you agree to pay 78.99USD for your plan and agree that
          if you don&apos;t cancel at least 6 days prior to the end of the
          one-week introductory offer, you will automatically be charged the
          full price of 78.99 USD every month until you cancel in Settings.
          Learn more about our cancellation and refund policy in the
          Subscription Terms
        </p>
        <p className="mt-10 max-w-lg mx-auto">
          By continuing, I agree that my credit/debit card data will be stored
          and used for repeated purchase attempts in the event of payment
          failure
        </p>
      </div>
    </div>
  );
};

export default PricingWithTestimonials;
