import { useState, useEffect } from "react";
import SEO from "@/components/SEO";
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  serviceProviderSchema,
} from "@/utils/schema";
import { siteUrl, defaultMeta, generateHreflang } from "@/utils/seo";
import { useRouter } from "next/router";
import Image from "next/image";

const printerBrands = [
  {
    name: "HP",
    logo: "https://printersclan.com/asset/images/hplogo.png",
    slug: "hp",
  },
  {
    name: "Brother",
    logo: "https://printersclan.com/asset/images/brotherprinterlogo.png",
    slug: "brother",
  },
  {
    name: "Epson",
    logo: "https://printersclan.com/asset/images/epsonlogo1.png",
    slug: "epson",
  },
  {
    name: "Canon",
    logo: "https://printersclan.com/asset/images/canonlogo.png",
    slug: "canon",
  },
];

const whyChooseUs = [
  {
    title: "Safe",
    description: "Your security and privacy are our top priorities",
    icon: "🛡️",
  },
  {
    title: "Reliable",
    description: "Consistent, dependable service you can count on",
    icon: "💎",
  },
  {
    title: "Quick",
    description: "Fast response times and efficient problem resolution",
    icon: "⚡",
  },
  {
    title: "Experienced",
    description: "Skilled professionals with years of expertise",
    icon: "🎓",
  },
];

const services = [
  {
    title: "Professional Services",
    description:
      "Get reliable, expert assistance for all your printer needs. Our professional services ensure efficient and effective solutions every time.",
  },
  {
    title: "Quick and Hassle-Free Assistance",
    description:
      "Receive fast, hassle-free support for your devices. Our streamlined service resolves issues easily and quickly, so you can get back to work.",
  },
  {
    title: "24/7 Available",
    description:
      "Enjoy around-the-clock support whenever you need it. Our team is available 24/7 to assist with any printer problems or questions.",
  },
  {
    title: "Experienced Experts",
    description:
      "Trust our experienced experts for accurate and efficient solutions. Our skilled team handles all printer issues with knowledge and professionalism.",
  },
  {
    title: "Packages for All",
    description:
      "Choose from a variety of packages designed to meet your needs. Affordable options ensure there's a perfect fit for everyone.",
  },
];

const commonIssues = [
  {
    title: "Paper Jam",
    description:
      "Step-by-step pipeline clearance routines to safely extract stock alignment feeds.",
  },
  {
    title: "Wireless Setup",
    description:
      "Bind physical device interfaces securely to localized network endpoints.",
  },
  {
    title: "Connectivity Faults",
    description:
      "Debug offline drops, driver mismatching, and target device connection errors.",
  },
  {
    title: "Responsive Faults",
    description:
      "Troubleshoot internal data hanging when terminal queue fails to execute.",
  },
  {
    title: "Blank Formats",
    description:
      "Resolve low-density print outputs, dry lines, or empty document outputs.",
  },
  {
    title: "System Code Decodes",
    description:
      "Isolate and clear persistent manufacturer firmware error messages.",
  },
];

const Home = () => {
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  // Auto-navigate when brand is selected
  useEffect(() => {
    if (selectedBrand) {
      router.push(`/troubleshoot/${selectedBrand}`);
    }
  }, [selectedBrand, router]);

  const meta = defaultMeta("/");
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      localBusinessSchema,
      websiteSchema,
      serviceProviderSchema,
    ],
  };

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        canonical={meta.path}
        ogImage={meta.ogImage}
        ogType="website"
        twitterCard="summary_large_image"
        hreflang={generateHreflang(meta.path)}
        geo={meta.geo}
        schema={combinedSchema}
      />

      {/* Hero Section - Printer Brand Selection */}
      <section className="relative bg-slate-900 overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 opacity-25 mix-blend-overlay pointer-events-none">
          <Image
            src="https://raw.githubusercontent.com/printalliance/public-images/refs/heads/main/printer-toner-hd-8k-wallpaper-stock-photographic-image_915071-69886.avif"
            alt="Background Texture"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Ambient Gradient Blowouts */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center z-10 space-y-8">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-blue-300 uppercase backdrop-blur-sm border border-white/5">
              Unified Triage Node
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
              PRINTER BRAND
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Select your printer brand and proceed (click 'NEXT') to access all
              necessary troubleshooting step-by-step instructions for issues
              like connectivity problems, wireless setup, not printing, blank
              prints, error codes or scanner issues.
            </p>
          </div>
          {/* Printer Brand Logos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10 max-w-4xl mx-auto">
            {printerBrands.map((brand) => (
              <button
                type="button"
                key={brand.slug}
                onClick={() => setSelectedBrand(brand.slug)}
                className={`group relative bg-white rounded-xl p-3 md:p-4 shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border-2 ${
                  selectedBrand === brand.slug
                    ? "border-navy ring-2 ring-navy ring-opacity-20 shadow-xl scale-105"
                    : "border-gray-200 hover:border-navy"
                }`}
              >
                {/* Selected Indicator */}
                {selectedBrand === brand.slug && (
                  <div className="absolute -top-2 -right-2 bg-navy text-white rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center shadow-lg z-10">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}

                {/* Logo Container - Fixed for rendering */}
                <div className="relative mb-2 md:mb-3">
                  <div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300 ${
                      "
                    aria-hidden
                  />
                  <div
                    className={`relative rounded-full flex items-center justify-center bg-white transition-all duration-300 ${
                      selectedBrand === brand.slug
                        ? "scale-105"
                        : "group-hover:scale-102"
                    }`}
                  >
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="max-w-[70%] max-h-[70%] object-contain rounded-full filter drop-shadow-sm"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>

                {/* Brand Name */}
                <div className="text-center">
                  <p
                    className={`font-semibold text-xs md:text-sm transition-colors duration-300 ${
                      selectedBrand === brand.slug
                        ? "text-navy"
                        : "text-gray-600 group-hover:text-navy"
                    }`}
                  >
                    {brand.name}
                  </p>
                </div>

                {/* Hover Overlay Effect */}
                {selectedBrand !== brand.slug && (
                  <div className="absolute inset-0 bg-gradient-to-br from-navy/0 to-navy/0 group-hover:from-navy/5 group-hover:to-transparent rounded-xl transition-all duration-300 pointer-events-none" />
                )}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="button"
              disabled={!selectedBrand}
              onClick={() =>
                selectedBrand && router.push(`/troubleshoot/${selectedBrand}`)
              }
              className="inline-flex h-12 items-center justify-center gap-2 px-8 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold text-sm transition-all shadow-md tracking-wide disabled:cursor-not-allowed active:scale-[0.98]"
            >
              <span>Initialize Support Pipeline</span>
              <span className="text-xs font-light">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Minimal Regulatory Notice Frame */}
      <section className="bg-slate-950 py-6 px-4 border-y border-white/5 text-center">
        <p className="text-[11px] text-slate-500 max-w-4xl mx-auto leading-relaxed uppercase tracking-wider">
          <span className="font-bold text-slate-400">Disclaimer:</span>{" "}
          PrintAlliance is an independent online support provider. We have no
          association or affiliation with any brands mentioned on this website
          in any manner whatsoever. The sole intent of this website is to
          provide necessary troubleshooting step-by-step instructions and
          experienced expert advice to help users solve printer-related issues.
          We will not be responsible for any kind of damage that occurs while
          following our troubleshooting steps.
        </p>
      </section>

      {/* Structural Diagnostics Advantages */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Why Choose Us?
            </h2>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
              Platform Integration Priorities
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 hover:border-slate-300 hover:bg-white transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center text-lg mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900 tracking-wide mb-1 uppercase">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clean Dynamic Execution Fault Vectors */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 border-t border-slate-200/60">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Common Issue Identifiers
            </h2>
            <p className="text-xs text-slate-400">
              Select pathways addressed inside current driver packages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonIssues.map((issue, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white border border-slate-200/80 flex items-start gap-4 hover:shadow-sm hover:border-slate-300 transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                    {issue.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {issue.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Call-to-Action Console Banner */}
      <section className="py-20 px-4 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative max-w-xl mx-auto space-y-6 z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Need Immediate Help?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Our certified experts are available 24/7 to assist you.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a
              href="tel:+13252195205"
              className="h-11 px-5 rounded-lg bg-white text-slate-900 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors shadow-sm"
            >
              📞 Connect Direct Operator Line
            </a>
            <a
              href="mailto:support@printalliance.net"
              className="h-11 px-5 rounded-lg bg-slate-800 border border-white/10 text-white font-medium text-xs flex items-center justify-center gap-2 hover:bg-slate-700 transition-colors"
            >
              ✉️ Open Email Route
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
