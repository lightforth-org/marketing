"use client";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
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
          </div>

          <div className="flex justify-end items-center">
            <Link
              href="https://www.lightforth.org/contact-us"
              className="relative text-nowrap bg-[#0494FC] hover:bg-[#0494FC]/90 text-white font-semibold text-sm py-2 px-2 lg:px-5 cursor-pointer rounded-md transition duration-300 overflow-hidden"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
