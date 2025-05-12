import React, { useState, useEffect } from "react";

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
    <div className="w-full mt-12 relative overflow-x-hidden">
      {/* Responsive blue curved shape */}
      <div className="absolute md:top-[-6%] right-[-18%] w-[50vw] min-h-[50vh] 3xl:hidden">
        <svg
          viewBox="0 0 616 349"
          fill="none"
          className="w-full h-full"
          preserveAspectRatio="xMinYMin slice"
        >
          <circle
            cx="404"
            cy="-55"
            r="354"
            stroke="url(#paint0_linear_34_14080)"
            strokeWidth="100"
          />
          <defs>
            <linearGradient
              id="paint0_linear_34_14080"
              x1="404"
              y1="-459"
              x2="-308"
              y2="262.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0494FC" />
              <stop offset="1" stopColor="#92B0E3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Countdown Timer */}
        <div className="text-center mb-6">
          <p className="text-sm font-medium text-gray-700">
            THIS OFFER ENDS IN
          </p>
          <p className="text-4xl font-bold text-[#0494FC]">
            {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
          </p>
        </div>

        {/* Main Headline */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-black">
            {`HERE'S HOW WE'LL FLOOD`}
            <br />
            YOUR INBOX WITH
            <br />
            <span className="text-black">5+ JOB OFFERS IN 21 DAYS -</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1559CB] mt-2">
            <span className="underline">START NOW</span> WITH 3 DAYS FREE!
          </h2>
        </div>

        {/* YouTube Video Embed */}
        <div
          className="max-w-4xl mx-auto mb-8"
          style={{
            borderLeft: "12px solid #0494FC",
            borderBottom: "12px solid #22DF72",
            background: "linear-gradient(135deg, #0494FC 0%, #22DF72 100%)",
          }}
        >
          <div className="relative" style={{ paddingTop: "56.25%" }}>
            <iframe
              src="https://www.youtube.com/embed/h6XYpPefAKg"
              title="How I Landed 5 Job Offers in 3 Weeks"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </div>

        {/* Trustpilot Rating */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-6">
          <p className="text-sm text-gray-700">Our customers say:</p>
          <div className="flex items-center">
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

              <span className="ml-1 text-sm">Trustpilot</span>
            </div>
            <span className="ml-2 text-sm">4.8 out of 471 Reviews</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform transition hover:scale-105"
            onClick={onClickScroll}
          >
            Start Getting Jobs - 3 days free
          </button>
        </div>
        {/* Additional Text */}
        <div className="text-center mt-8">
          {addedText.map((text, index) => (
            <p
              key={index}
              className="text-sm text-[#7A7A83] mb-2"
              style={{ fontSize: "0.875rem" }}
            >
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
