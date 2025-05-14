import React from "react";
import Image from "next/image";
import Link from "next/link";

const Success = () => {
  return (
    <div className="w-full space-y-3 max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-xs text-center">
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
        Your account has been successfully created, Find your temporary password
        in your inbox to log in.
      </p>
      <Link href={"https://www.app.lightforth.com/auth/login"}>
        <button
          type="button"
          className="mt-6 w-full rounded-md bg-[#1b9dfc] px-4 py-2 text-md cursor-pointer font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login to your account
        </button>
      </Link>
    </div>
  );
};

export default Success;
