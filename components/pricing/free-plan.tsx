import React from "react";
import { FreeSpecialOffer } from "../special-offer";
import { FreePlanFeatures } from "./pricing-plan";
import AnimatedButton from "../animated-button";
import Testimonial from "./testimonial";

const freePlanFeatues = [
  "Build an ATS-compliant resume",
  "Generate a cover letter specific to a role",
  "Automatically apply to multiple and different jobs",
  "See multiple career-specific jobs",
  "Practice live interviews as much as you want",
  "Attend job interviews with our co-pilot live interview assistance",
  "No credit card required",
];

const addedText = [
  "✓ 71% of users get at least 2 interviews before trial ends",
  "✓ Works for LinkedIn, Indeed, Glassdoor, ZipRecruiter and more",
  "✓ Copilot answers interview questions even if they ask you to share your screen",
];

const FreePlan = ({ onCtaClick }: { onCtaClick: () => void }) => {
  return (
    <div className="py-12 md:py-16">
      <FreeSpecialOffer />
      {/* Headline */}
      <div className="max-w-3xl mx-auto text-center uppercase mb-5 lg:mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-black px-2">
          Your Personalized Career Plan
        </h1>
        <h1 className="text-[#0099ff] text-3xl md:text-4xl font-extrabold  px-2">
          that makes you the candidate recruiters chase.
        </h1>
      </div>
      <div className="max-w-4xl mx-auto w-full space-y-10">
        <div className="max-w-xl space-y-10 mx-auto">
          <FreePlanFeatures features={freePlanFeatues} />
          <AnimatedButton onClick={onCtaClick}>
            Start Getting Jobs for free
          </AnimatedButton>
        </div>

        <p className="text-center text-xs">No credit card required</p>
        <div className="flex gap-x-5 gap-y-5 flex-wrap">
          <Testimonial
            quote='"I kept getting a headache wondering which company to choose from 9 job offers. Stay or go ahead!"'
            role="Product Manager"
            company="Quantum Finance"
            imageSrc="/images/female.png"
          />
          <Testimonial
            quote='"I got 9 job offers but I needed a salary higher than $200K/year. This was the plan that gave me that."'
            role="Chief Marketing Officer"
            company="Chase"
            imageSrc="/images/male.png"
          />
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
      </div>
      {/* Fine Print */}
      <div className="max-w-6xl mx-auto mt-8 text-[10px] space-y-5 text-gray-300 text-center">
        <p>
          By continuing, you agree to pay 78.99USD for your plan and agree that
          if you don&apos;t cancel at least 6 days prior to the end of the
          one-week introductory offer, you will automatically be charged the
          full price of 78.99 USD every month until you cancel in Settings.
          Learn more about our cancellation and refund policy in the
          Subscription Terms
        </p>
        <p className="max-w-lg mx-auto">
          By continuing, I agree that my credit/debit card data will be stored
          and used for repeated purchase attempts in the event of payment
          failure
        </p>
      </div>
    </div>
  );
};

export default FreePlan;
