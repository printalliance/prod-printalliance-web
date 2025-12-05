import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import SEO from "@/components/SEO";
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  serviceProviderSchema,
} from "@/utils/schema";
import { siteUrl, defaultMeta, generateHreflang } from "@/utils/seo";

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
  },
  {
    title: "Reliable",
    description: "Consistent, dependable service you can count on",
  },
  {
    title: "Quick",
    description: "Fast response times and efficient problem resolution",
  },
  {
    title: "Experienced",
    description: "Skilled professionals with years of expertise",
  },
];

const services = [
  {
    title: "Professional Services",
    description: "Get reliable, expert assistance for all your printer needs. Our professional services ensure efficient and effective solutions every time.",
  },
  {
    title: "Quick and Hassle-Free Assistance",
    description: "Receive fast, hassle-free support for your devices. Our streamlined service resolves issues easily and quickly, so you can get back to work.",
  },
  {
    title: "24/7 Available",
    description: "Enjoy around-the-clock support whenever you need it. Our team is available 24/7 to assist with any printer problems or questions.",
  },
  {
    title: "Experienced Experts",
    description: "Trust our experienced experts for accurate and efficient solutions. Our skilled team handles all printer issues with knowledge and professionalism.",
  },
  {
    title: "Packages for All",
    description: "Choose from a variety of packages designed to meet your needs. Affordable options ensure there's a perfect fit for everyone.",
  },
];

const commonIssues = [
  {
    title: "Paper Jam",
    description: "Step-by-step guide to clear paper jams safely",
  },
  {
    title: "Wireless Setup",
    description: "Connect your printer to WiFi networks easily",
  },
  {
    title: "Printer Offline",
    description: "Fix connectivity and offline status issues",
  },
  {
    title: "Not Printing",
    description: "Troubleshoot when printer won't respond",
  },
  {
    title: "Blank Prints",
    description: "Resolve issues with blank or faded printouts",
  },
  {
    title: "Error Codes",
    description: "Decode and fix printer error messages",
  },
];

const Home = () => {
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  const handleNext = () => {
    if (selectedBrand) {
      router.push(`/troubleshoot/${selectedBrand}`);
    } else {
      alert("Please select a printer brand to continue");
    }
  };

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
      <section
        className="relative px-4 pt-0 pb-10"
        style={{
          backgroundImage:
            "url('https://raw.githubusercontent.com/printalliance/public-images/refs/heads/main/printer-toner-hd-8k-wallpaper-stock-photographic-image_915071-69886.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-8">
            <div className="rounded-b-[3rem] rounded-t-xl bg-black/55 p-8 pb-10 text-center shadow-2xl backdrop-blur text-white border-t border-white/10">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                Printer Brand
              </h1>
              <p className="text-lg text-gray-100 mb-3">
                Your Trusted Printer Troubleshooting Partner
              </p>
              <p className="text-base md:text-lg text-gray-100 leading-relaxed">
                Select your printer brand and proceed (click 'NEXT') to access all necessary troubleshooting step-by-step instructions for issues like printer offline, wireless setup, not printing, blank prints, error codes or scanner issues.
              </p>
            </div>
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
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* Logo Container */}
                <div className="relative mb-2 md:mb-3">
                  <div
                    className={`absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300 ${
                      selectedBrand === brand.slug
                        ? "border-navy shadow-[0_0_15px_rgba(8,47,73,0.3)]"
                        : "group-hover:border-navy group-hover:shadow-[0_0_20px_rgba(8,47,73,0.35)]"
                    }`}
                    aria-hidden
                  />
                  <div
                    className={`relative aspect-square flex items-center justify-center rounded-xl bg-white transition-all duration-300 ${
                      selectedBrand === brand.slug ? "scale-105" : "group-hover:scale-102"
                    }`}
                  >
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="max-w-[70%] max-h-[70%] object-contain filter drop-shadow-sm"
                    />
                  </div>
                </div>

                {/* Brand Name */}
                <div className="text-center">
                  <p className={`font-semibold text-xs md:text-sm transition-colors duration-300 ${
                    selectedBrand === brand.slug ? "text-navy" : "text-gray-600 group-hover:text-navy"
                  }`}>
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

          <div className="text-center mb-8">
            <button
              type="button"
              onClick={handleNext}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-red px-12 py-4 text-xl font-bold text-white shadow-[0_10px_25px_rgba(201,47,58,0.45)] transition-all duration-300 hover:bg-[#c92f3a] hover:shadow-[0_15px_35px_rgba(201,47,58,0.55)] hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red/40 disabled:cursor-not-allowed"
              disabled={!selectedBrand}
            >
              <span>Next</span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-2xl transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white/30">
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="bg-navy py-12 px-4 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl backdrop-blur">
            <p className="text-base leading-relaxed">
              <strong className="font-semibold">Disclaimer:</strong> PrintAlliance is an independent online support provider. We have no association or affiliation with any brands mentioned on this website in any manner whatsoever. The sole intent of this website is to provide necessary troubleshooting step-by-step instructions and experienced expert advice to help users solve printer-related issues. We will not be responsible for any kind of damage that occurs while following our troubleshooting steps.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-navy mb-3">
              Why Choose Us?
            </h2>
          </div>

          {/* Key Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center hover:border-navy transition-all duration-300"
              >
                <div className="w-12 h-12 bg-navy rounded-lg flex items-center justify-center mx-auto mb-4">
                  {index === 0 && (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  {index === 3 && (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Detailed Services */}
          <div className="space-y-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-8 hover:border-navy hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-navy mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Issues Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-navy mb-3">
              Common Issues We Solve
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Expert solutions for all your printer problems
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commonIssues.map((issue, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-navy transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {index === 0 && (
                      <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
                      </svg>
                    )}
                    {index === 3 && (
                      <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                    )}
                    {index === 4 && (
                      <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                    {index === 5 && (
                      <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-navy mb-1">
                      {issue.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{issue.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-navy mb-3">
              How It Works
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Get your printer fixed in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-navy text-white rounded-lg flex items-center justify-center text-2xl font-semibold mx-auto mb-6">
                1
              </div>
              <h3 className="text-lg font-semibold text-navy mb-3">
                Select Your Brand
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Choose your printer brand from HP, Brother, Epson, or Canon
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-navy text-white rounded-lg flex items-center justify-center text-2xl font-semibold mx-auto mb-6">
                2
              </div>
              <h3 className="text-lg font-semibold text-navy mb-3">
                Describe Your Issue
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Tell us what problem you're experiencing with your printer
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-navy text-white rounded-lg flex items-center justify-center text-2xl font-semibold mx-auto mb-6">
                3
              </div>
              <h3 className="text-lg font-semibold text-navy mb-3">
                Get Solutions
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Follow step-by-step instructions or get help from our experts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-navy text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">
            Need Immediate Help?
          </h2>
          <p className="text-base md:text-lg text-gray-300 mb-8">
            Our certified experts are available 24/7 to assist you
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a
              href="tel:+12105128406"
              className="bg-white text-navy hover:bg-gray-100 font-semibold text-base px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call +1-325-219-5205
            </a>
            <a
              href="mailto:Support@printalliance.net"
              className="bg-transparent border border-white text-white hover:bg-white hover:text-navy font-semibold text-base px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
