"use client";
import React, { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

// Sample testimonial data
const testimonialSlides = [
  [
    {
      quote:
        "I went from ZERO responses to 5 interviews in just 14 days. I didn't even have to apply myself!",
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
      quote:
        "I thought this was a scam... until I got 3 offers in 18 days. Best decision I ever made!",
      name: "Oscar Claren",
      title: "Software Engineer",
    },
    {
      quote:
        "Not just 4 job offers, but two above $150k/year. To share, the highest I had ever done was $60k/year with 7 years experience.",
      name: "Shawna Piper",
      title: "Public Health Analyst",
    },
  ],
  [
    {
      quote:
        "After six months of job searching, I found my dream role in just two weeks using LightForth.",
      name: "Jamie Reynolds",
      title: "Marketing Director",
    },
    {
      quote:
        "The personalized job matching saved me countless hours of searching through irrelevant listings.",
      name: "Terri Wallace",
      title: "Project Manager",
    },
    {
      quote:
        "My salary increased by 35% thanks to the negotiation tips provided by LightForth.",
      name: "Carlos Rodriguez",
      title: "Data Scientist",
    },
    {
      quote:
        "The platform's AI matching technology understood my skills better than I did myself!",
      name: "Aisha Johnson",
      title: "UX Designer",
    },
  ],
];

const TestimonialCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonialSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? testimonialSlides.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900">
          What Our Users Are Saying
        </h2>

        {/* Subheading */}
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Don't just take our word for it, listen to applicants who have found
          jobs on LightForth.
        </p>

        {/* Carousel Container */}
        <div className="relative">
          {/* Testimonials Grid */}
          <div className="transition-all duration-300 ease-in-out">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {testimonialSlides[currentSlide].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-4 md:p-6 rounded-lg flex flex-col"
                >
                  <div className="text-[#0494FC] mb-2">
                    <svg
                      className="h-4 w-4 md:h-6 md:w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.039 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H10V18H0Z" />
                    </svg>
                  </div>
                  <p className="text-sm md:text-base text-gray-800 mb-3 md:mb-4 flex-grow">
                    {testimonial.quote}
                  </p>
                  <div>
                    <p className="font-bold text-gray-900 text-sm md:text-base">
                      {testimonial.name}
                    </p>
                    <p className="text-[#0494FC] text-xs md:text-sm">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 left-0 right-0 -mt-4 flex justify-between pointer-events-none">
            <button
              onClick={prevSlide}
              className="pointer-events-auto p-1 md:p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 transform -translate-x-1/2"
              aria-label="Previous testimonials"
            >
              <FiArrowLeft className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="pointer-events-auto p-1 md:p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 transform translate-x-1/2"
              aria-label="Next testimonials"
            >
              <FiArrowRight className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonialSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-blue-500" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
