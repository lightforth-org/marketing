import React from "react";
import Image from "next/image";

const Goals = () => {
  return (
    <div className="py-12 space-y-10 text-center">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900">
        Our Users Meet their Goals
      </h2>
      <Image
        src="/images/goals.png"
        alt="Goals"
        className="mx-auto"
        width={1000}
        height={500}
      />
    </div>
  );
};

export default Goals;
