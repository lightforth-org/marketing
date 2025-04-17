// @ts-nocheck
"use client";
import apiService from "@/services/api";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Payment = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createLightforthPartnerUser = async () => {
    try {
      const response = await apiService.post(
        `/account/create-lightforth-partner-user`,
        formData,
        {
          headers: {
            "x-signature": process.env.NEXT_PUBLIC_X_SIGNATURE || "",
          },
        },
        10000
      );

      if (!response.response?.newPartnerUser?.authorizerId) {
        throw new Error(
          response?.response?.authorizer?.message ||
            "Failed to create user - missing authorizerId"
        );
      }

      return response.response.newPartnerUser.authorizerId;
    } catch (error) {
      console.error("Error creating partner user:", error);
      throw error;
    }
  };

  const createUserSub = async (authorizerId: string, planId: string) => {
    try {
      const response = await apiService.post(
        "/account/create-lightforth-partner-user-subscription",
        {
          planId,
          authorizerId,
        },
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

      window.open(paymentLink, "_blank");
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
      if (!slug) {
        throw new Error("Plan ID is missing");
      }

      const userAuthId = await createLightforthPartnerUser(slug);
      await createUserSub(userAuthId, slug);

      // Success message could be added here
      console.log("User subscription created successfully");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error("Submission error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Link href="/">
            <div className="h-8 w-auto cursor-pointer">
              <Image
                src="/images/logo.svg"
                alt="Lightforth Logo"
                width={25}
                height={24}
                className="h-8 w-auto hidden lg:block"
              />
            </div>
          </Link>
        </div>
        <div className="">
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
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Payment Information
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
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
                disabled={isLoading}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Last Name */}
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
                disabled={isLoading}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Email */}
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
                disabled={isLoading}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Submit Button with Loading Spinner */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    Processing...
                  </>
                ) : (
                  "Go to Step 2"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 text-center text-gray-500 text-sm">
        Lightforth
      </footer>
    </div>
  );
};

export default Payment;
