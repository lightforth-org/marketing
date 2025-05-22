import React from "react";
import Image from "next/image";
import CountdownTimer from "./timer";

const BannerWithTimer = ({ text, time }: { text: string; time: number }) => {
  return (
    <div className="w-full md:max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between bg-gradient-to-r from-[#F38059] to-[#FFA560] text-white text-center py-2 px-2 rounded-xl">
        <Image src="/icons/fire.svg" alt="Fire" width={24} height={32} />
        <span className="font-medium text-xs uppercase tracking-widest px-1">
          {text}
          <CountdownTimer durationInMinutes={time} className="pl-1" />
        </span>
        <Image src="/icons/fire.svg" alt="Fire" width={24} height={32} />
      </div>
    </div>
  );
};

export default BannerWithTimer;

export const SpecialOffer = () => {
  return <BannerWithTimer text="Limited Time Offer" time={7} />;
};

export const FreeSpecialOffer = () => {
  return (
    <BannerWithTimer text="Try all our features for free in" time={1440} />
  );
};
