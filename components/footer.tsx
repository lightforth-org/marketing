import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#B8E1FE] py-28 mt-18 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
        {/* Badge Icon */}
        <Image
          src="/images/money-back.svg"
          alt="Badge Icon"
          className="absolute -top-12 left-1/2 transform -translate-x-1/2"
          width={110}
          height={130}
        />

        {/* Heading */}
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Money-Back Guarantee
        </h3>

        {/* Guarantee Text */}
        <p className="text-gray-700 mb-1">
          In case you don't get visible results, you can get a full refund
          within 30 days after purchase.
        </p>

        {/* Learn More Link */}
        <a href="#" className="text-blue-500 text-sm hover:underline">
          Learn about applicable limitations
        </a>

        {/* Copyright */}
        <div className="mt-12 text-xs text-gray-500">
          LightForth. (US) Dallas-Parkway, Dallas Texas 75254
        </div>
      </div>
    </footer>
  );
};

export default Footer;
