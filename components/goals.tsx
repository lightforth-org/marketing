import React from "react";
import Image from "next/image";

const Goals = () => {
  return (
    <div className="py-12 space-y-10 text-center">
      <div>
        <h2 className="text-3xl md:text-3xl lg:text-4xl font-semibold  text-gray-900">
          Real life screenshot.
        </h2>
        <h2 className="text-3xl md:text-3xl lg:text-4xl font-semibold  text-gray-900">
          32 applications within 20mins
        </h2>
      </div>

      <div className="bg-[#B5C2FB] pt-[3%] pl-[3%] w-full md:max-w-[50%] rounded-xl mx-auto">
        <Image
          src="/images/goals.png"
          alt="Goals"
          className="mx-auto"
          width={1000}
          height={500}
        />
      </div>
    </div>
  );
};

export default Goals;
