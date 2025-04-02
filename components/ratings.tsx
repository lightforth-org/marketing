// RatingsSection.jsx
import React from "react";
import Image from "next/image";

const RatingsSection = () => {
  return (
    <div className="relative w-full py-16 overflow-hidden max-w-[1592px] mx-auto rounded-2xl">
      {/* Gradient Background - I'm assuming you already have this image */}
      <div className="absolute inset-0 z-0">
        {/* <div className="w-full h-full bg-gradient-to-r from-blue-400 to-blue-300 opacity-80 rounded-lg"></div> */}
        <Image
          src="/images/bg-gradient.png" // Replace with your gradient image path
          alt="Gradient Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-80"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          {/* Total Ratings Count */}
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              13.800+
            </h2>
            <p className="text-sm md:text-base text-white/90">
              of 5-star ratings
            </p>
          </div>

          {/* Ratings Cards Container */}
          <div className="flex flex-col md:flex-row justify-center items-center w-full gap-4 md:gap-6">
            {/* Trustpilot Rating Card */}
            <div className="bg-white rounded-lg p-4 md:p-6 w-full md:w-auto shadow-md flex flex-col items-center">
              <div className="text-2xl font-bold mb-2">4,7</div>
              <div className="flex mb-2">
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon />
              </div>
              <div className="text-sm text-gray-600">Trustpilot</div>
            </div>

            {/* Google Rating Card */}
            <div className="bg-white rounded-lg p-4 md:p-6 w-full md:w-auto shadow-md flex flex-col items-center">
              <div className="text-2xl font-bold mb-2">4,7</div>
              <div className="flex mb-2">
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon filled />
                <StarIcon />
              </div>
              <div className="text-sm text-gray-600">Google</div>
            </div>

            {/* Honest Brand Reviews Card */}
            <div className="bg-white rounded-lg py-2 px-5 w-full md:w-auto shadow-md flex  items-center relative">
              <LeafDecoration side="left" />
              <div className="px-6">
                <p className="text-center text-sm font-medium mb-1">
                  The most effective career assistant.
                </p>
                <p className="text-center text-xs text-gray-600">
                  Honest Brand Reviews
                </p>
              </div>
              <LeafDecoration side="right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Star Icon Component
const StarIcon = ({ filled }) => {
  return (
    <svg
      className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-300"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
};

// Leaf Decoration Component
const LeafDecoration = ({ side }) => {
  const imgSrc =
    side === "left" ? "/icons/leaf-left.svg" : "/icons/leaf-right.svg";
  return <Image src={imgSrc} alt="Leaf Decoration" width={28} height={89} />;
};

export default RatingsSection;
