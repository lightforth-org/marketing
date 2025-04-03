"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import CountdownTimer from "./timer";

const Navbar = ({ onClickScroll }: { onClickScroll: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white fixed top-0 left-0  z-50 w-full  shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-18">
        <div className="flex justify-between h-16">
          <div className="flex gap-x-24">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/">
                  <div className="h-8 w-auto cursor-pointer">
                    <Image
                      src="/images/logo.svg"
                      alt="Lightforth Logo"
                      width={120}
                      height={32}
                      className="h-8 w-auto"
                    />
                  </div>
                </Link>
              </div>
            </div>

            <div className="hidden md:flex items-center">
              <div className="flex flex-row items-center space-x-2">
                <div className="text-sm font-semibold text-black tracking-wide">
                  DISCOUNT IS RESERVED FOR
                </div>
                <div className="text-[#0494FC] text-lg font-bold">
                  <CountdownTimer durationInMinutes={7} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center md:w-md">
            <div className="w-full hidden md:block">
              <button
                className="w-full bg-[#0494FC] hover:bg-[#0494FC]/90 text-white font-medium text-sm  py-3 px-14 cursor-pointer rounded-md transition duration-300"
                onClick={onClickScroll}
              >
                Start Getting Jobs
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <FiX className="block h-6 w-6" />
                ) : (
                  <FiMenu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-3">
            <div className="flex flex-col items-center justify-center">
              <div className="text-sm font-medium text-gray-700">
                DISCOUNT IS RESERVED FOR
                <CountdownTimer durationInMinutes={7} className="pl-2" />
              </div>
              <button
                className="mt-3 w-full bg-[#0494FC] hover:bg-[#0494fc]/90 cursor-pointer text-white font-medium py-2 px-4 rounded transition duration-300"
                onClick={onClickScroll}
              >
                Start Getting Jobs
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
