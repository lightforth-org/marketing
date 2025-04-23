import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#B8E1FE] pt-24 pb-12 mt-18 relative">
      <div className="w-full md:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
        {/* Badge Icon */}
        <Image
          src="/images/money-back.svg"
          alt="Badge Icon"
          className="absolute -top-12 left-1/2 transform -translate-x-1/2"
          width={100}
          height={120}
        />

        {/* Heading */}
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Money-Back Guarantee
        </h3>

        {/* Guarantee Text */}
        <p className="text-gray-700 mb-1 font-medium">
          In case you don&apos;t get visible results, you can get a full refund
          within 30 days after purchase.
        </p>

        {/* Learn More Link */}
        <a
          href="#"
          className="text-[#0494FC] text-sm hover:underline font-medium"
        >
          Learn about applicable limitations
        </a>

        {/* Copyright */}
        <div className="pt-20 text-xs text-gray-500">
          LightForth. (US) Dallas-Parkway, Dallas Texas 75254
        </div>
      </div>
    </footer>
  );
};

export default Footer;
