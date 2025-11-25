import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "./Navigation";
import Button from "@/components/common/Button";
import GetStartedModal from "@/components/GetStartedModal";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-navy/95 text-white backdrop-blur">
      {/* Contact Info Bar */}
      <div className="border-b border-white/10 bg-navy/90">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-8 px-4 py-2 text-sm lg:px-8">
          <a
            href="mailto:Support@printalliance.net"
            className="flex items-center gap-2 hover:text-red transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Support@printalliance.net</span>
          </a>
          <a
            href="tel:+12105128406"
            className="flex items-center gap-2 hover:text-red transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>+1-210-512-8406</span>
          </a>
        </div>
      </div>

      {/* Main Header */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-white">
          <Image
            src="/images/logo.svg"
            width={40}
            height={40}
            alt="PrintAlliance logo"
          />
          <span className="text-xl font-bold">PrintAlliance</span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          <Navigation />
        </nav>
        <div className="hidden lg:block">
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center rounded-lg bg-red px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-[#c92f3a] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red"
          >
            Get Started
          </button>
        </div>
        <button
          className="lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="space-y-1">
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
          </div>
        </button>
      </div>
      {open && (
        <div className="bg-navy px-4 pb-4 lg:hidden">
          <div className="flex flex-col gap-4">
            <Navigation onNavigate={() => setOpen(false)} />
            <button
              onClick={() => {
                setOpen(false);
                setModalOpen(true);
              }}
              className="inline-flex items-center justify-center rounded-lg bg-red px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-[#c92f3a] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
      <GetStartedModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </header>
  );
};

export default Header;

