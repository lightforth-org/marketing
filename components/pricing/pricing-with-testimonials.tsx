// @ts-nocheck
import { trackAction } from "@/lib/ampHelper";
import apiService from "@/services/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TbLoader2 } from "react-icons/tb";
import SpecialOffer from "../special-offer";
import PricingPlan from "./pricing-plan";
import Testimonial from "./testimonial";
import { useSearchParams } from "next/navigation";
import axios from "axios";

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
  const searchParams = useSearchParams();
  // Add state to store plan data from API
  // const [planData, setPlanData] = useState<{
  //   pro?: PlanData;
  //   premium?: PlanData;
  // }>({});
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const contactId = searchParams.get("contactId") || null;
  // const authorizerId = searchParams.get("authorizerId") || null;

  // const openModal = () => setIsModalOpen(true);

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

  const updateContactToDroppedOff = async (contactId) => {
    setIsLoading(true);
    try {
      await axios.put(
        `https://rest.gohighlevel.com/v1/contacts/${contactId}`,
        {
          tags: ["quiz-dropped_off"],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GHL_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log("Failed to update contact:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // const createUserSub = async (planId: string) => {
  //   try {
  //     const payload: {
  //       planId: string;
  //       authorizerId: string;
  //       contactId: string;
  //     } = {
  //       planId,
  //       authorizerId,
  //       contactId,
  //     };

  //     const response = await apiService.post(
  //       "/account/create-lightforth-partner-user-subscription",
  //       payload,
  //       {
  //         headers: {
  //           "x-signature": process.env.NEXT_PUBLIC_X_SIGNATURE || "",
  //         },
  //       }
  //     );

  //     if (response.statusCode !== 200) {
  //       throw new Error("Failed to create subscription");
  //     }

  //     const paymentLink = response.response?.paymentLink?.data;

  //     if (!paymentLink) {
  //       throw new Error("Payment link not found");
  //     }

  //     await updateContactToDroppedOff(contactId);

  //     // Load the payment URL in the current window
  //     window.location.href = paymentLink;

  //     return true;
  //   } catch (error) {
  //     console.error("Error creating subscription:", error);
  //     throw error;
  //   }
  // };

  // Handle CTA button click with dynamic payment URLs
  const handlePaymentClick = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Track analytics as before
      trackAction("QValue_Bump", {
        selectedPlan: selectedPlan,
        planType: selectedPlan === "Pro" ? "Pro" : "Premium",
        price: selectedPlan === "Pro" ? 78.99 : 128.99,
      });

      // Determine which URL to use
      if (selectedPlan === "Pro") {
        await updateContactToDroppedOff(contactId);
        window.open(
          "https://careersuccess.lightforth.org/checkout-order-3827",
          "_blank"
        );
      } else if (selectedPlan === "Premium") {
        await updateContactToDroppedOff(contactId);
        window.open(
          "https://careersuccess.lightforth.org/checkout-order-3827-9663",
          "_blank"
        );
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error("Submission error:", err);
      setIsLoading(false);
    }
  };

  console.log({ error });

  return (
    <div className="bg-white py-12 md:py-16">
      {/* Holiday Offer Banner */}
      <SpecialOffer />
      <div className="md:max-w-4xl mx-auto sm:px-6 lg:px-8">
        {/* Headline */}
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-4xl font-semibold text-[#0494FC] mb-1">
            You&apos;re one click away from interview invites.
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-4">
            And the trial is on us for free, Cancel anytime
          </h2>
          <div className="flex flex-col items-center space-y-2 mt-6">
            <div className="text-xs md:!text-sm flex flex-col md:flex-row items-center gap-x-3">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-500">
                  Try everything for 3 days for free
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-500">
                  ATS resume that gets past bots
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-500">
                  Auto apply while you sleep
                </span>
              </div>
            </div>

            <div className="text-xs md:!text-sm flex items-center">
              <span className="text-green-500 mr-2 hidden sm:block">✓</span>
              <span className="text-gray-500">
                An interview copilot that feeds you the right answers - in your
                tone - during live calls
              </span>
            </div>
            <div className="text-xs md:!text-sm flex items-center">
              <span className="text-green-500 mr-2 hidden text-center sm:text-justify sm:block">
                ✓
              </span>
              <span className="text-gray-500">
                If you&apos;re not on your way to interviews - cancel anytime,
                we&apos;ll still be rooting for you
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
          className="text-center w-full bg-[#0494FC] hover:bg-[#0494fc]/90 cursor-pointer text-white font-bold py-3 px-4 md:px-8 rounded-md transition duration-300"
        >
          {isLoading ? (
            <TbLoader2 className="animate-spin text-white text-3xl mx-auto" />
          ) : (
            "Start getting jobs, cancel anytime"
          )}
        </button>
        <div className="mt-6 space-y-3 flex flex-col items-center">
          <div className="text-xs md:!text-sm flex  items-center">
            <span className="text-green-500 mr-2 hidden sm:block">✓</span>
            <span className="text-gray-500 text-center ">
              71% of users get at least 2 interviews before trial ends
            </span>
          </div>
          <div className="text-xs md:!text-sm flex items-center">
            <span className="text-green-500 mr-2 hidden sm:block">✓</span>
            <span className="text-gray-500 text-center sm:text-justify">
              Works for LinkedIn, Indeed, Glassdoor, ZipRecruiter and more
            </span>
          </div>
          <div className="text-xs md:!text-sm flex items-center">
            <span className="text-green-500 mr-2 hidden sm:block">✓</span>
            <span className="text-gray-500 text-center sm:text-justify">
              Copilot answers interview questions even if they ask you to share
              your screen
            </span>
          </div>
        </div>
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
          By continuing, you agree that if you don&apos;t cancel before your 3
          days free access expires, you will automatically be charged the full
          price of $79 USD every month until you cancel in Settings. Learn more
          about our cancellation and refund policy in the Subscription Terms.
        </p>
        <p className="mt-10 max-w-lg mx-auto">
          By continuing, I agree that my credit/debit card data will be stored
          and used for repeated purchase attempts in the event of payment
          failure
        </p>
      </div>

      {/* <Modal isOpen={isModalOpen} onClose={closeModal} title="Example Modal">
        <PaymentDetails planId={planId} />
      </Modal> */}
    </div>
  );
};

export default PricingWithTestimonials;
