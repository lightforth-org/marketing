import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container mx-auto border-t border-gray-300 py-6 px-4 sm:px-8 md:px-16">
      <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 gap-4">
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

        {/* Right side: Links + Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
          <div className="flex gap-4 font-semibold">
            <a href="#" className="hover:underline">
              Refund Policy
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </div>
          <div className="text-xs text-gray-500">© 2025 Lightforth AI</div>
        </div>
      </div>
    </footer>
  );
}
