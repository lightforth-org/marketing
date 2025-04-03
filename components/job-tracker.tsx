import React from "react";

const JobApplicationTracker = () => {
  return (
    <div className="bg-amber-50 p-4 md:p-6 rounded-lg w-full max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Column - You Today */}
        <div className="flex-1 p-4">
          <h2 className="text-xl font-bold mb-8">You today</h2>

          <div className="relative mb-10">
            <div className="relative">
              {/* Placeholder for the stressed person image */}
              <div className="bg-gray-100 h-48 w-full rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Person image placeholder</span>
              </div>

              {/* Rejection mails bubble */}
              <div className="absolute bottom-0 right-4 bg-white rounded-full p-4 shadow-md">
                <div className="text-center">
                  <p className="text-red-500 font-bold text-xl">150</p>
                  <p className="text-red-500 font-bold text-sm">Rejection</p>
                  <p className="text-red-500 font-bold text-sm">mails</p>
                </div>
                {/* Mail icon */}
                <div className="bg-gray-100 h-10 w-12 mx-auto mt-1 rounded flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">Job Applications</span>
              <span className="font-bold text-lg">300</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">Responses</span>
              <span className="font-bold text-lg">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">Interviews</span>
              <span className="font-bold text-lg">0</span>
            </div>
            <div className="mt-6">
              <span className="font-semibold text-lg">Job Offers</span>
              <div className="mt-2 h-2 bg-gray-200 rounded-full w-full">
                <div className="h-2 bg-green-300 rounded-full w-1/6"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Center divider with arrows */}
        <div className="hidden md:flex items-center justify-center px-4">
          <div className="flex flex-col items-center">
            <div className="transform rotate-45 bg-white h-8 w-8 mb-1"></div>
            <div className="transform rotate-45 bg-white h-8 w-8"></div>
          </div>
        </div>

        {/* Right Column - You by Day 21 */}
        <div className="flex-1 p-4">
          <h2 className="text-xl font-bold mb-8">You by Day 21</h2>

          <div className="relative mb-10">
            <div className="relative">
              {/* Placeholder for the happy person image */}
              <div className="bg-blue-50 h-48 w-full rounded-lg flex items-center justify-center">
                <span className="text-gray-400">
                  Happy person image placeholder
                </span>
              </div>

              {/* Acceptance mails bubble */}
              <div className="absolute bottom-0 right-4 bg-white rounded-full p-4 shadow-md">
                <div className="text-center">
                  <p className="text-blue-500 font-bold text-xl">102</p>
                  <p className="text-blue-500 font-bold text-sm">Acceptance</p>
                  <p className="text-blue-500 font-bold text-sm">mails</p>
                </div>
                {/* Mail icon */}
                <div className="bg-gray-100 h-10 w-12 mx-auto mt-1 rounded flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">Job Applications</span>
              <span className="font-bold text-lg">110</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">Responses</span>
              <span className="font-bold text-lg">102</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">Interviews</span>
              <span className="font-bold text-lg">44</span>
            </div>
            <div className="mt-6">
              <span className="font-semibold text-lg">Job offers</span>
              <div className="mt-2 h-2 bg-gray-200 rounded-full w-full">
                <div className="h-2 bg-green-500 rounded-full w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationTracker;
