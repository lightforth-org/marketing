// @ts-nocheck
import { trackAction } from "@/lib/ampHelper";
import SpecialOffer from "../special-offer";
import PricingPlan from "./pricing-plan";
import Testimonial from "./testimonial";
import apiService from "@/services/api";
import { useEffect, useState } from "react";
import AnimatedButton from "../animated-button";
import { useRouter, useSearchParams } from "next/navigation";
import { updateContactToDroppedOff } from "@/lib/ghlActions";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface PlanData {
  _id: string;
  paymentPlanId: {
    _id: string;
    name: string;
    price: number;
  };
  // Other plan fields not needed for this specific implementation
}

const addedText = [
  "✓ 71% of users get at least 2 interviews before trial ends",
  "✓ Works for LinkedIn, Indeed, Glassdoor, ZipRecruiter and more",
  "✓ Copilot answers interview questions even if they ask you to share your screen",
];
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
  const searchParams = useSearchParams();
  const funnel = searchParams.get("funnel") || null;
  const contactId = searchParams.get("contactId") || null;
  const authorizerId = searchParams.get("authorizerId") || null;

  const { push } = useRouter();

  const [planData, setPlanData] = useState<{
    pro?: PlanData;
    premium?: PlanData;
  }>({});
  const [loading, setLoading] = useState(false);

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

  const createUserSub = async (planId: string) => {
    try {
      const payload: {
        planId: string;
        authorizerId: string;
        contactId: string;
      } = {
        planId,
        authorizerId: authorizerId || "",
        contactId: contactId || "",
      };

      const response = await apiService.post(
        "/account/create-lightforth-partner-user-subscription",
        payload,
        {
          headers: {
            "x-signature": process.env.NEXT_PUBLIC_X_SIGNATURE || "",
          },
        }
      );

      if (response.statusCode !== 200) {
        throw new Error("Failed to create subscription");
      }

      const paymentLink = response.response?.paymentLink?.data;

      if (!paymentLink) {
        throw new Error("Payment link not found");
      }

      await updateContactToDroppedOff(contactId, [`${funnel}-dropped_off`]);

      // Load the payment URL in the current window
      window.location.href = paymentLink;

      return true;
    } catch (error) {
      console.error("Error creating subscription:", error);
      throw error;
    }
  };

  const handlePaymentClick = async () => {
    if (loading) return; // prevent double-clicks
    setLoading(true);

    try {
      trackAction("QValue_Bump", {
        selectedPlan,
        planType: selectedPlan === "Pro" ? "Pro" : "Premium",
        price: selectedPlan === "Pro" ? 78.99 : 128.99,
      });

      if (selectedPlan === "Pro" && planData.pro?.paymentPlanId?._id) {
        await createUserSub(planData.pro.paymentPlanId._id);
      } else if (
        selectedPlan === "Premium" &&
        planData.premium?.paymentPlanId?._id
      ) {
        await createUserSub(planData.premium.paymentPlanId._id);
      }
    } catch (err) {
      console.error("Payment error:", err);
      push("/subscription/complete?status=failed&contact_id=0");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-12 md:py-16">
      {/* Holiday Offer Banner */}
      <SpecialOffer />
      <div className="md:max-w-5xl mx-auto sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center mb-5 lg:mb-12">
          <h2 className="text-2xl md:text-5xl font-semibold text-[#0494FC]">
            {heading}
          </h2>
          <p className="text-2xl md:text-5xl font-semibold text-gray-800">
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
        <div className="mt-10 max-w-xl mx-auto px-2">
          <AnimatedButton onClick={handlePaymentClick}>
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin mr-2 text-white text-xl" />
            ) : (
              "Start getting jobs, cancel anytime"
            )}
          </AnimatedButton>
          <p className="text-xs text-gray-500 text-center mt-5">
            30-day money-back guarantee
          </p>
        </div>

        {/* Additional Text */}
        <div className="text-center mt-8">
          {addedText.map((text, index) => (
            <p key={index} className="text-xs md:text-sm text-[#7A7A83] mb-2">
              {/* svg */}

              {text}
            </p>
          ))}
        </div>

        {/* Fine Print */}
        <div className="mt-8 text-[10px] space-y-5 text-gray-300 text-center">
          <p>
            By continuing, you agree to pay 78.99USD for your plan and agree
            that if you don&apos;t cancel at least 6 days prior to the end of
            the one-week introductory offer, you will automatically be charged
            the full price of 78.99 USD every month until you cancel in
            Settings. Learn more about our cancellation and refund policy in the
            Subscription Terms
          </p>
          <p className="max-w-lg mx-auto">
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
