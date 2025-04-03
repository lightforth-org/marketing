"use client";
import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

// Sample testimonials data (flattened to cycle one-by-one)
const testimonials = [
  {
    quote: "I went from ZERO responses to 5 interviews in just 14 days!",
    name: "Mark Snowden",
    title: "Financial Analyst",
  },
  {
    quote:
      "I wasted months applying on my own. LightForth got me hired in 3 weeks!",
    name: "Jensen Wedell",
    title: "Business Manager",
  },
  {
    quote: "I thought this was a scam... until I got 3 offers in 18 days.",
    name: "Oscar Claren",
    title: "Software Engineer",
  },
  {
    quote: "Not just 4 job offers, but two above $150k/year.",
    name: "Shawna Piper",
    title: "Public Health Analyst",
  },
  {
    quote:
      "After six months of job searching, I found my dream role in just two weeks.",
    name: "Jamie Reynolds",
    title: "Marketing Director",
  },
  {
    quote:
      "The personalized job matching saved me countless hours of searching.",
    name: "Terri Wallace",
    title: "Project Manager",
  },
  {
    quote:
      "My salary increased by 35% thanks to the negotiation tips provided.",
    name: "Carlos Rodriguez",
    title: "Data Scientist",
  },
  {
    quote:
      "The platform's AI matching technology understood my skills better than I did myself!",
    name: "Aisha Johnson",
    title: "UX Designer",
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize(); // Set on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Next and previous controls
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-3xl lg:text-4xl font-semibold text-gray-900">
          What Our Users Are Saying
        </h2>

        {/* Subheading */}
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Don&apos;t just take our word for it, listen to applicants who have
          found jobs on LightForth.
        </p>

        {/* Carousel Container */}
        <div className="relative">
          {/* Testimonials */}
          <div className="transition-all duration-300 ease-in-out">
            <div
              className={`grid ${
                isMobile ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-4"
              } gap-4 md:gap-6`}
            >
              {isMobile ? (
                <div className="bg-white p-4 md:p-6 space-y-5 rounded-lg flex flex-col">
                  <div className="text-[#0494FC] mb-2 px-2 md:px-4">
                    <svg
                      className="h-4 w-4 md:h-6 md:w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.039 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H10V18H0Z" />
                    </svg>
                  </div>
                  <p className="text-sm text-left md:text-sm text-gray-800 mb-3 md:mb-4 flex-grow px-2 md:px-4">
                    {testimonials[currentIndex].quote}
                  </p>
                  <div className="bg-[#f9fafb] border-t-1 border-gray-200 text-left p-2 md:p-4">
                    <p className="font-bold text-gray-900 text-sm md:text-base">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-[#0494FC] text-xs md:text-sm">
                      {testimonials[currentIndex].title}
                    </p>
                  </div>
                </div>
              ) : (
                testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 md:p-6 space-y-5 rounded-lg flex flex-col"
                  >
                    <div className="text-[#0494FC] mb-2 px-2 md:px-4">
                      <svg
                        className="h-4 w-4 md:h-6 md:w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.039 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H10V18H0Z" />
                      </svg>
                    </div>
                    <p className="text-sm text-left md:text-sm text-gray-800 mb-3 md:mb-4 flex-grow px-2 md:px-4">
                      {testimonial.quote}
                    </p>
                    <div className="bg-[#f9fafb] border-t-1 border-gray-200 text-left p-2 md:p-4">
                      <p className="font-bold text-gray-900 text-sm md:text-base">
                        {testimonial.name}
                      </p>
                      <p className="text-[#0494FC] text-xs md:text-sm">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Navigation Arrows (Only for Mobile) */}
          {isMobile && (
            <div className="absolute top-1/2 left-0 right-0 -mt-4 flex justify-between pointer-events-none">
              <button
                onClick={prevSlide}
                className="pointer-events-auto p-1 md:p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 transform -translate-x-1/2"
              >
                <FiArrowLeft className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="pointer-events-auto p-1 md:p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 transform translate-x-1/2"
              >
                <FiArrowRight className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
