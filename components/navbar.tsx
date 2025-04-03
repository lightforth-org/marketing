"use client";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "./timer";

const Navbar = ({ onClickScroll }: { onClickScroll: () => void }) => {
  return (
    <nav className="bg-white fixed top-0 left-0  z-50 w-full  shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-18">
        <div className="flex justify-between gap-x-1 lg:gap-x-0 h-16">
          <div className="flex gap-x-5 lg:gap-x-24 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/">
                  <div className="h-8 w-auto cursor-pointer">
                    <Image
                      src="/images/logo.svg"
                      alt="Lightforth Logo"
                      width={25}
                      height={24}
                      className="h-8 w-auto hidden lg:block"
                    />
                  </div>
                </Link>
              </div>
              <div className="">
                <Link href="/">
                  <div className="h-8 w-auto cursor-pointer">
                    <Image
                      src="/images/logo-sm.svg"
                      alt="Lightforth Logo small"
                      width={120}
                      height={32}
                      className="h-8 w-auto block lg:hidden"
                    />
                  </div>
                </Link>
              </div>
            </div>

            <div className="inline-flex flex-col items-start lg:flex-row lg:items-center gap-x-1">
              <div className="text-[10px] lg:text-sm font-semibold text-black tracking-wide">
                DISCOUNT IS RESERVED FOR
              </div>
              <div className="text-[#0494FC] text-md lg:text-lg font-bold">
                <CountdownTimer durationInMinutes={7} />
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center md:w-md">
            <div className="w-full">
              <button
                className="relative w-full text-nowrap bg-[#0494FC] hover:bg-[#0494FC]/90 text-white font-medium text-sm py-3 px-2 lg:px-14 cursor-pointer rounded-md transition duration-300 overflow-hidden"
                onClick={onClickScroll}
              >
                <span className="relative z-10">Start Getting Jobs</span>

                {/* Optimized ping animation */}
                <span
                  className="absolute inset-0 rounded-md bg-[#0494FC] opacity-40
    animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] scale-90"
                ></span>

                {/* Optimized pulse animation */}
                <span
                  className="absolute -inset-0.5 rounded-lg bg-[#0494FC]/20
    animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] blur-[2px]"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
