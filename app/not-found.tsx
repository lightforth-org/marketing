import React from "react";
import Image from "next/image";

const Notfound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <Image
        src={"/images/404.png"}
        alt="404 Not Found"
        width={638}
        height={400}
        className="mb-4 w-full max-w-[638px] h-auto"
      />

      {/* Content Section */}
      <div className="max-w-xl mx-auto text-center mb-8">
        <h1 className="text-[40px] sm:text-[64px] font-medium text-[#1E1E1E] leading-none">
          Opps! Something Wrong
        </h1>

        <p className="text-[16px] sm:text-[18px] font-normal text-[#7E8083] mt-4">
          We’re sorry, the page you have looked for does not exist in our
          database! Maybe go to our home page or try to use a search?
        </p>
      </div>
    </div>
  );
};

export default Notfound;
