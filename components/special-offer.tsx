import React from "react";
import Image from "next/image";
import CountdownTimer from "./timer";

const SpecialOffer = () => {
  return (
    <div className="w-full md:max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between bg-gradient-to-r from-[#F38059] to-[#FFA560] text-white text-center py-2 px-2 rounded-xl">
        <Image src="/icons/fire.svg" alt="Fire" width={24} height={32} />
        <span className="font-medium text-xs uppercase tracking-widest px-1">
          YOUR SPECIAL HOLIDAY OFFER EXPIRES IN
          <CountdownTimer durationInMinutes={7} className="pl-1" />
        </span>
        <Image src="/icons/fire.svg" alt="Fire" width={24} height={32} />
      </div>
    </div>
  );
};

export default SpecialOffer;
