import React from "react";
import Image from "next/image";

const Success = () => {
  return (
    <div className="w-full  space-y-3 max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-xs text-center">
      <Image
        src={"/images/check-success.svg"}
        alt="success-checkmark-green"
        width={111}
        height={111}
        className="mx-auto mb-4"
      />
      <h2 className="text-3xl font-semibold text-gray-900">
        Check Your Email!
      </h2>
      <p className="mt-4 text-md text-gray-600">
        Your account has been successfully created, and your $1 payment will be
        refunded. Find your temporary password in your inbox to log in.
      </p>
    </div>
  );
};

export default Success;
