import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import GetStartedModal from "@/components/GetStartedModal";

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white text-navy shadow-md">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-1 px-3 py-1 text-center md:flex-row md:items-center md:justify-between md:gap-1.5 md:text-left lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/printalliance-logo.png"
            width={150}
            height={150}
            alt="PrintAlliance logo"
            className="h-20 w-auto md:h-24"
          />
        </Link>

        {/* Contact Info */}
        <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
            {/* Email */}
            <a
              href="mailto:Support@printalliance.net"
            className="flex shrink-0 items-center gap-1 text-sm font-semibold text-navy hover:text-red transition-colors whitespace-nowrap md:text-base"
            >
            <svg className="h-4 w-4 shrink-0 md:h-5 md:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="hidden md:inline">Support@printalliance.net</span>
              <span className="md:hidden">Email</span>
            </a>

            {/* Phone */}
            <a
              href="tel:+12105128406"
            className="flex shrink-0 items-center gap-1 text-sm font-semibold text-navy hover:text-red transition-colors whitespace-nowrap md:text-base"
            >
            <svg className="h-4 w-4 shrink-0 md:h-5 md:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            <span className="hidden md:inline">+1-210-512-8406</span>
            <span className="md:hidden">Call</span>
            </a>
        </div>

        {/* Get Started Button */}
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-red px-3 py-1.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#c92f3a] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red focus-visible:ring-offset-white whitespace-nowrap md:px-4 md:py-2 md:text-base"
        >
          Get Started
        </button>
      </div>
      <GetStartedModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </header>
  );
};

export default Header;

