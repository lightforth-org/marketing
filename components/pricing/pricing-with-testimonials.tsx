/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
"use client";
import { trackAction } from "@/lib/ampHelper";
import apiService from "@/services/api";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { TbLoader2 } from "react-icons/tb";
import { updateContactToDroppedOff } from "@/lib/ghlActions";

interface PlanData {
  _id: string;
  paymentPlanId: {
    _id: string;
    name: string;
    price: number;
  };
  // Other plan fields not needed for this specific implementation
}

// New PricingCard component to match the design exactly
const PricingCard = ({
  color,
  price,
  features,
  onStartTrial,
}: {
  color: "purple" | "blue";
  price: string;
  features: string[];
  onStartTrial: () => void;
}) => {
  return (
    <div className="w-full rounded-3xl overflow-hidden shadow-sm bg-white border border-gray-100">
      <div className="flex flex-col md:flex-row">
        {/* What's Included Section - Now on the left */}
        <div className="p-8 pb-12 md:w-1/2">
          <h3 className="text-base font-bold mb-8">{`WHAT'S INCLUDED:`}</h3>
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="text-gray-500 mt-0.5">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <p className="text-gray-800 text-base">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Price Section with CTA*/}
        <div
          className={`${
            color === "purple" ? "bg-[#8c1d49]" : "bg-[#1055db]"
          } text-white p-8 text-center md:w-1/2 flex flex-col justify-center m-4 rounded-lg`}
        >
          <div className="flex justify-center items-center mb-4 space-x-2">
            <p className="text-xs font-medium text-center">TOTAL VALUE:</p>
            <p className="text-4xl font-bold">{price}$</p>
          </div>

          <h3 className="text-2xl font-bold mb-6">
            UNLOCK 3 DAYS OF
            <br />
            ACCESS FOR JUST $0
          </h3>

          <button
            onClick={onStartTrial}
            className="bg-white cursor-pointer text-gray-800 font-semibold py-3 px-6 rounded-full w-full max-w-xs mx-auto hover:bg-gray-100 transition mb-4"
          >
            Start 3 days free trial
          </button>

          <p className="text-xs text-center leading-tight">
            MONTHLY MEMBERSHIP WILL REBILL AT ${price}/
            <br />
            MONTH AFTER 3 DAY TRIAL. CANCEL ANYTIME.
          </p>
        </div>
      </div>
    </div>
  );
};

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
  const searchParams = useSearchParams();
  const router = useRouter();

  // Add state to store plan data from API
  const [planData, setPlanData] = useState<{
    pro?: PlanData;
    premium?: PlanData;
  }>({});
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const funnel = searchParams.get("funnel") || null;
  console.log({ funnel });

  // const openModal = () => setIsModalOpen(true);

  const xSignature =
    funnel === "jobApplication"
      ? process.env.NEXT_PUBLIC_X_SIGNATURE
      : funnel === "autoApply"
      ? process.env.NEXT_PUBLIC_AUTO_X_SIGNATURE
      : process.env.NEXT_PUBLIC_VBP_X_SIGNATURE;

  // Fetch plans on component mount
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await apiService.get<{
          response: { data: PlanData[] };
        }>(
          "/account/get-all-plans-for-partner",
          {},
          {
            headers: {
              "x-signature": xSignature || "",
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
  }, [xSignature]);

  /**
   * Handle payment button click with dynamic payment URLs
   */

  const handlePaymentClick = async (plan: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Track analytics event
      trackAction("QValue_Bump", {
        selectedPlan: plan,
        planType: plan === "Pro" ? "Pro" : "Premium",
        price: plan === "Pro" ? 78.99 : 128.99,
      });

      // Job Application funnel
      if (funnel === "jobApplication") {
        const checkoutUrl =
          plan === "Pro"
            ? "https://buy.stripe.com/bIY17CgY99cQ1e8eUW"
            : "https://buy.stripe.com/eVa2bG6jvcp2bSM7st";
        window.open(checkoutUrl, "_blank");
        return;
      }

      const paymentPlanId =
        plan === "Pro"
          ? planData.pro?.paymentPlanId?._id
          : planData.premium?.paymentPlanId?._id;

      if (!paymentPlanId) {
        console.error(`No payment plan ID found for ${plan} plan`);
        return;
      }

      // Explicitly handle Auto Apply funnel routing
      if (funnel === "autoApply") {
        router.push(
          `/confirm-details?funnel=autoApply&planId=${paymentPlanId}`
        );
        return;
      }

      // Default flow (VBP)
      router.push(`/confirm-details?funnel=vbp&planId=${paymentPlanId}`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Payment submission error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  console.log({ error });

  return (
    <Suspense
      fallback={<TbLoader2 className="animate-spin text-blue-400 text-3xl" />}
    >
      <div className="bg-white py-12 md:py-16">
        {/* Holiday Offer Banner */}
        {/* <SpecialOffer /> */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              TRANSFORM YOUR CAREER
              <br />
              JOURNEY WITH LIGHTFORTH
            </h2>
          </div>

          {/* New Pricing Cards */}
          <div className=" gap-y-12 md:gap-x-8 max-w-5xl mx-auto mb-12">
            {/* Pro Plan */}
            <div className="w-full md:w-full my-8">
              <PricingCard
                color="purple"
                price="79"
                features={[
                  "A+ ATS Resume Builder",
                  "3 AI Cover Letter Generator",
                  "50 Auto-apply Jobs",
                  "50 Recommeded jobs",
                  "3 Interview Prep sessions",
                  "3 Interview Co-Pilot sessions",
                ]}
                onStartTrial={() => handlePaymentClick("Pro")}
              />
            </div>

            {/* Premium Plan */}
            <div className="w-full md:w-full">
              <PricingCard
                color="blue"
                price="129"
                features={[
                  "A+ ATS Resume Builder",
                  "5 AI Cover Letter Generator",
                  "150 Auto-apply Jobs",
                  "150 Recommeded jobs",
                  "5 Interview Prep sessions",
                  "5 Interview Co-Pilot sessions",
                ]}
                onStartTrial={() => handlePaymentClick("Premium")}
              />
            </div>
          </div>

          {/* Bottom Feature Bullets */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-5 items-center mb-12 mt-8">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <p className="text-gray-700">
                  71% of users get at least 2 interviews before trial ends
                </p>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <p className="text-gray-700">
                  Works for LinkedIn, Indeed, Glassdoor, ZipRecruiter and more
                </p>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <p className="text-gray-700">
                  Copilot answers interview questions even if they ask you to
                  share your screen
                </p>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="text-center mb-10 mt-12">
              <div className="flex justify-center items-center gap-2">
                <p className="text-sm text-gray-600">We accept:</p>
                <div className="flex justify-center">
                  <Image
                    src="/images/gateways.png"
                    alt="Payment gateways"
                    width={300}
                    height={40}
                  />
                </div>
              </div>
            </div>

            {/* Fine Print */}
            <div className="max-w-3xl mx-auto text-xs text-gray-400 text-center">
              <p>
                {`By continuing, you agree that if you don't cancel at least 6 days prior to the end of the one-week introductory offer, you will automatically be charged the full price of 79.99 USD every month until you cancel in Settings. Learn more about our cancellation and refund policy in the Subscription Terms.`}
              </p>
              <p className="mt-6 mb-8">
                By continuing, I agree that my credit/debit card data will be
                stored and used for repeated purchase attempts in the event of
                payment failure.
              </p>
            </div>
          </div>
        </div>

        {/* <Modal isOpen={isModalOpen} onClose={closeModal} title="Example Modal">
        <PaymentDetails planId={planId} />
      </Modal> */}
      </div>
    </Suspense>
  );
};

export default PricingWithTestimonials;
