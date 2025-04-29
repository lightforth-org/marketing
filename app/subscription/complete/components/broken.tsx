import React from "react";
import Image from "next/image";

const Broken = () => {
  return (
    <div>
      <Image
        src={"/images/broken.svg"}
        alt="broken-svg"
        width={150}
        height={96}
        className="mx-auto mb-4"
      />
      <h2 className="text-black font-semibold text-2xl md:text-3xl">
        Oops! Something went wrong
      </h2>

      <div className="w-full mt-4 space-y-3 max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-xs text-center">
        <p className="text-gray-600 text-sm md:text-base">
          We encountered an issue while processing your request. Please try
          again later or contact support if the issue persists.
        </p>
        {/* <button
          onClick={() => window.location.reload()}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Retry
        </button>
        <a
          href="/support"
          className="block text-blue-500 hover:underline text-sm mt-2"
        >
          Contact Support
        </a> */}
      </div>
    </div>
  );
};
export default Broken;
