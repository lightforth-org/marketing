//@ts-nocheck
"use client";
import apiService from "@/services/api";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface PaymentProps {
  planId: string;
}

const PaymentDetails: React.FC<PaymentProps> = ({ planId }) => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const contactId = searchParams.get("contactId") || null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateContactToDroppedOff = async (contactId) => {
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
  };

  const createLightforthPartnerUser = async () => {
    try {
      const response = await apiService.post(
        `/account/create-lightforth-partner-user`,
        {
          ...formData,
          source: "funnel",
        },
        {
          headers: {
            "x-signature": process.env.NEXT_PUBLIC_X_SIGNATURE || "",
          },
        },
        10000
      );

      if (!response?.response?.newPartnerUser?.authorizerId) {
        throw new Error(
          response?.response?.authorizer?.message || "This user already exists"
        );
      }

      return response?.response.newPartnerUser.authorizerId;
    } catch (error) {
      console.error("Error creating partner user:", error);
      throw error;
    }
  };

  const createUserSub = async (authorizerId: string, planId: string) => {
    try {
      const payload: {
        planId: string;
        authorizerId: string;
        contactId?: string;
      } = {
        planId,
        authorizerId,
      };

      if (contactId) {
        payload.contactId = contactId;
      }

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

      if (contactId) {
        await updateContactToDroppedOff(contactId);
      }

      // Load the payment URL in the current window
      window.location.href = paymentLink;

      return true;
    } catch (error) {
      console.error("Error creating subscription:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!planId) {
        throw new Error("Plan ID is missing");
      }

      // Then create the partner user
      const userAuthId = await createLightforthPartnerUser();
      if (!userAuthId) {
        throw new Error("Failed to create partner user");
      }

      // Finally create the subscription
      await createUserSub(userAuthId, planId);

      // Success message could be added here
      console.log("User subscription created successfully");
      // Note: No need to set loading to false since we're redirecting
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error("Submission error:", err);
      setIsLoading(false); // Only set loading to false on error, as success redirects page
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-lg font-medium text-gray-700">
            Processing your request...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full ">
      <Link href="/">
        <div className="h-8 w-auto cursor-pointer mb-1">
          <Image
            src="/images/logo.svg"
            alt="Lightforth Logo"
            width={25}
            height={20}
            className="h-8 w-auto mx-auto hidden lg:block"
          />
        </div>
      </Link>
      <div className="mb-6 space-y-2">
        <div className="flex justify-center gap-x-3">
          <Link href="/">
            <div className="h-8 w-auto cursor-pointer">
              <Image
                src="/images/logo-sm.svg"
                alt="Lightforth Logo small"
                width={120}
                height={32}
                className="h-8 w-auto block lg:hidden"
              />
            </div>
          </Link>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center">
            Get Started
          </h1>
        </div>

        <p className="text-center text-sm text-gray-700">
          Enter your details to continue.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0494fc] focus:border-[#0494fc] sm:text-sm"
            placeholder="Enter your First Name"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0494fc] focus:border-[#0494fc] sm:text-sm"
            placeholder="Enter your Last Name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0494fc] focus:border-[#0494fc] sm:text-sm"
            placeholder="Enter your email"
          />
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

        {/* Information about the $1 verification charge */}
        <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
          <h3 className="text-xs sm:text-sm font-medium text-blue-800">
            ! Important Information
          </h3>
          <div className="mt-2 text-xs sm:text-sm text-blue-700">
            <p>
              A <strong>$1</strong> verification charge will appear on your
              card, but it will be immediately refunded. This is just to verify
              your payment method.
            </p>
            <p className="mt-2">
              After successful verification, we&apos;ll send a temporary
              password to your email address. You can use this to log in and
              enjoy your 3-day free trial.
            </p>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-[#0494fc] cursor-pointer hover:bg-blue-500 text-white font-bold p-3 rounded-md transition duration-300 flex items-center justify-center"
          >
            Start 3 days for FREE
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentDetails;
