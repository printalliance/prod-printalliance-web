import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import GetStartedModal from "@/components/GetStartedModal";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md text-slate-900 shadow-sm transition-all duration-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Identity */}
        <Link
          href="/"
          className="group flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 rounded-md"
          aria-label="PrintAlliance Home"
        >
          <Image
            src="/images/printalliance-logo.png"
            width={160}
            height={48}
            alt="PrintAlliance Logo"
            className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            priority
          />
        </Link>

        {/* Global Action Terminal */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          {/* Communication Nodes */}
          <nav
            className="hidden sm:flex items-center gap-4 md:gap-6"
            aria-label="Quick Contact"
          >
            {/* Email Gateway */}
            <a
              href="mailto:support@printalliance.net"
              className="group flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded px-1"
            >
              <MailIcon className="h-4 w-4 text-slate-400 group-hover:text-red-600 transition-colors duration-200" />
              <span className="hidden md:inline">
                support@printalliance.net
              </span>
            </a>

            {/* Voice Gateway */}
            <a
              href="tel:+13252195205"
              className="group flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded px-1"
            >
              <PhoneIcon className="h-4 w-4 text-slate-400 group-hover:text-red-600 transition-colors duration-200" />
              <span>+1 (325) 219-5205</span>
            </a>
          </nav>

          {/* Primary Call to Action */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-red px-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 whitespace-nowrap"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Lazy Modals/Overlays */}
      <GetStartedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </header>
  );
};

/* --- Accessible UI Icon Primitives --- */

const MailIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

export default Header;
