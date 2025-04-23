"use client";
import Image from "next/image";

const FeatureSection = () => {
  return (
    <div className="py-16 md:py-24">
      <div className="w-full md:max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="w-full md:max-w-2xl mx-auto text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl text-center lg:text-4xl font-semibold text-gray-900">
            Your current job search strategy isn&apos;t working. That&apos;s why
            you&apos;re here.
          </h2>
        </div>

        <div className="relative w-full md:max-w-5xl mx-auto">
          {/* Slider container */}
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out">
              <div className="relative w-full aspect-[16/9] border-4 rounded-xl border-[#0A2A60]">
                <Image
                  src={"/images/AutoApply10s.gif"}
                  alt={"Autoapplication Interface"}
                  layout="fill"
                  objectFit="covers"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
