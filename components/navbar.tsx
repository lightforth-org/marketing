"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Navbar = ({ onClickScroll }: { onClickScroll: () => void }) => {
  return (
    <nav className="bg-white fixed top-0 left-0  z-50 w-full  shadow-sm">
      <div className="w-[95%] md:container mx-auto px-2 md:px-0 py-2 md:py-0">
        <div className="flex justify-between gap-x-0 lg:gap-x-0 h-16">
          <div className="flex gap-x-5 lg:gap-x-24 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="https://lightforth.org">
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
            {/*
            <div className="inline-flex flex-col items-start lg:flex-row lg:items-center gap-x-1">
              <div className="text-[10px] lg:text-sm font-semibold text-black tracking-wide">
                DISCOUNT IS RESERVED FOR
              </div>
              <div className="text-[#0494FC] text-xl lg:text-lg font-bold">
                <CountdownTimer durationInMinutes={7} />
              </div>
            </div> */}
          </div>

          <div className="relative flex justify-end items-center">
            {/* Light blue circular ring with infinite animation */}

            <motion.button
              className="ring-8 ring-[#0494fc33] rounded-full relative text-nowrap bg-[#0494FC] hover:bg-[#0494FC]/90 text-white font-semibold text-sm md:text-base py-2 px-3 lg:px-10 cursor-pointer transition duration-300 overflow-hidden"
              onClick={onClickScroll}
              animate={{
                scale: [1, 1.1, 1],
                transition: {
                  duration: 2.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop" as const,
                },
              }}
            >
              <span className="relative z-10">Start Getting Jobs</span>
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
