"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";

const FeatureSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slideRef = useRef(null);

  const slides = [
    {
      id: 1,
      image: "/images/dashboard.png",
      alt: "Lightforth Dashboard Interface",
    },
    {
      id: 2,
      image: "/images/dashboard.png",
      alt: "Resume Builder Interface",
    },
    {
      id: 3,
      image: "/images/dashboard.png",
      alt: "Job Matches Interface",
    },
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className=" py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900">
            Your current job search strategy isn't working. That's why you're
            here.
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Slider container */}
          <div className="overflow-hidden rounded-lg shadow-xl">
            <div
              ref={slideRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide) => (
                <div key={slide.id} className="flex-shrink-0 w-full relative">
                  <div className="relative w-full aspect-[16/9]">
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-lg"
                      priority={slide.id === 1}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-10"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <FiChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          <button
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-10"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <FiChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* Indicator dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`focus:outline-none ${
                  currentSlide === index
                    ? "focus:ring-0"
                    : "focus:ring-2 focus:ring-blue-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                <FaCircle
                  className={`${
                    currentSlide === index
                      ? "text-blue-500 w-3 h-3"
                      : "text-gray-300 w-2 h-2"
                  } transition-all duration-300`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
