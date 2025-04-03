import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="pt-20 pb-5 md:py-16 lg:pt-32 lg:pb-20">
      <div className="md:max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2">
            Here&apos;s How We&apos;ll Flood Your Inbox with
          </h1>
          <h2 className="text-3xl md:text-3xl lg:text-4xl font-semibold text-[#0494FC] mb-8">
            5+ Job Offers in 21 Days (Or You Don&apos;t Pay!)
          </h2>

          <div className="bg-[#FAF2E8] rounded-lg p-6 max-w-4xl mx-auto mt-5 lg:mt-12">
            <Image
              src="/images/hero-value.png"
              alt="Value Bump Image"
              width={856}
              height={553}
              className="hidden md:block"
            />
            <Image
              src="/images/hero-value-mobile.png"
              alt="Value Bump Image"
              width={350}
              height={414}
              className="block md:hidden"
            />
          </div>
        </div>
      </div>
      <div className="text-xs md:text-md text-gray-800 text-center mt-4">
        Results are not typical. Individual results may vary.
      </div>
    </div>
  );
};

export default HeroSection;
