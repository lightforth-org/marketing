import React, { useState, useEffect } from "react";
import AnimatedButton from "./animated-button";

const HeroSection = ({ onClickScroll }: { onClickScroll: () => void }) => {
  const [minutes, setMinutes] = useState(9);
  const [seconds, setSeconds] = useState(56);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(timer);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds]);

  const addedText = [
    "✓ 71% of users get at least 2 interviews before trial ends",
    "✓ Works for LinkedIn, Indeed, Glassdoor, ZipRecruiter and more",
    "✓ Copilot answers interview questions even if they ask you to share your screen",
  ];

  return (
    <div className="w-full mt-18 md:mt-18 relative">
      <div className="relative z-10 max-w-6xl mx-auto py-8">
        {/* Main Headline */}
        <div className="uppercase text-center mb-4 md:mb-6 max-w-[668px] mx-auto leading-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-black px-2">
            {`Here’s How `}
            <span className="relative px-1">
              {`We’ll Flood`}

              <svg
                width="201"
                height="14"
                viewBox="0 0 201 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-2 left-0 -z-10"
              >
                <path
                  d="M5 5H149.591L46.5116 9H196"
                  stroke="#DFF1FF"
                  stroke-width="9.1497"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            {`Your Inbox with`}
            <span className="text-[#0099ff] pl-2">{`5+ Job Offers in 21 Days (Or You Don’t Pay!)`}</span>
          </h1>
        </div>

        {/* YouTube Video Embed */}
        {/* YouTube Video Embed */}
        <div className="relative my-10 md:my-12 max-w-5xl mx-auto ">
          {/* gradient background */}
          <div className="absolute top-2 md:top-5 -left-2 md:-left-5 w-full h-full bg-gradient-to-b from-[#0494FC] to-[#22DF72] "></div>

          <div className="relative" style={{ paddingTop: "56.25%" }}>
            <iframe
              src="https://www.youtube.com/embed/oRCGjicLWkQ"
              title="How I Landed 5 Job Offers in 3 Weeks"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full "
            ></iframe>
          </div>
        </div>

        {/* Trustpilot Rating */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-6">
          <p className="text-sm text-gray-700">Our customers say:</p>
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex">
              <span className="font-bold mr-2">Excellent</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    key={star}
                  >
                    <rect
                      width="18.5066"
                      height="18.5066"
                      transform="translate(0.114136 0.324219)"
                      fill="#00B773"
                    />
                    <path
                      d="M9.49439 12.5762L12.3089 11.863L13.4849 15.4872L9.49439 12.5762ZM15.9717 7.89176H11.0173L9.49439 3.22656L7.97146 7.89176H3.01709L7.02685 10.7834L5.50391 15.4486L9.51367 12.557L11.9812 10.7834L15.9717 7.89176Z"
                      fill="white"
                    />
                  </svg>
                ))}
              </div>
              <div className="flex items-center ml-2">
                <svg
                  width="22"
                  height="21"
                  viewBox="0 0 22 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.2755 15.8297L15.8667 14.6662L17.785 20.5781L11.2755 15.8297ZM21.8416 8.18819H13.7598L11.2755 0.578125L8.79124 8.18819H0.709473L7.25036 12.9052L4.76607 20.5152L11.307 15.7983L15.3321 12.9052L21.8416 8.18819Z"
                    fill="#32B2A8"
                  />
                </svg>

                <span className="ml-1 text-sm font-bold">Trustpilot</span>
              </div>
            </div>
            <p className="ml-2 text-sm font-bold">4.8 out of 471 Reviews</p>
          </div>
        </div>

        {/* CTA Button */}
        <div
          className="text-center  max-w-sm py-2 mx-auto px-2 md:px-0"
          onClick={onClickScroll}
        >
          <AnimatedButton>Start Getting Jobs - 3 days free</AnimatedButton>
        </div>
        {/* Additional Text */}
        <div className="text-center mt-8">
          {addedText.map((text, index) => (
            <p key={index} className="text-xs md:text-sm text-[#7A7A83] mb-2">
              {/* svg */}

              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
