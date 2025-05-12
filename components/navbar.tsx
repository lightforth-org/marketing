"use client";
import Image from "next/image";
import Link from "next/link";

const Navbar = ({ onClickScroll }: { onClickScroll: () => void }) => {
  return (
    <nav className="bg-white fixed top-0 left-0 z-50 w-full shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="cursor-pointer">
              <div className="relative h-8 w-8 sm:w-32">
                {/* Desktop Logo */}
                <Image
                  src="/images/logo.svg"
                  alt="Lightforth Logo"
                  fill
                  className="hidden lg:block object-contain"
                  sizes="(max-width: 1024px) 32px, 128px"
                />
                {/* Mobile Logo */}
                <Image
                  src="/images/logo-sm.svg"
                  alt="Lightforth Logo"
                  fill
                  className="lg:hidden object-contain"
                  sizes="(min-width: 1024px) 32px, 128px"
                />
              </div>
            </Link>
          </div>

          {/* CTA Button */}
          <div className="flex items-center">
            <button
              onClick={onClickScroll}
              className="relative bg-[#0494FC] hover:bg-[#0494FC]/90 text-white font-semibold
                         text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6 lg:px-8 rounded-[100px]
                         transition-all duration-300 overflow-hidden transform hover:scale-105
                         active:scale-95"
            >
              <span className="relative z-10 whitespace-nowrap">
                Start Getting Jobs
              </span>

              {/* Radar beam animation */}
              <span className="absolute inset-0 origin-bottom-right overflow-hidden">
                <span className="absolute top-0 left-0 w-full h-full">
                  <span
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-transparent to-white opacity-30
                             transform rotate-0 animate-[radar_2s_linear_infinite]"
                    style={{ transformOrigin: "bottom right" }}
                  ></span>
                </span>
              </span>

              {/* Subtle glow effect */}
              <span className="absolute -inset-1 rounded-lg bg-[#0494FC]/20 animate-pulse opacity-70 blur-sm"></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
