import { useState } from "react";
import { useRouter } from "next/router";

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

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GetStartedModal = ({ isOpen, onClose }: GetStartedModalProps) => {
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  if (!isOpen) return null;

  const handleNext = async () => {
    if (selectedBrand) {
      // Save support request to Supabase
      try {
        const response = await fetch("/api/save-support-request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            brand: selectedBrand,
          }),
        });

        if (!response.ok) {
          console.error("Failed to save support request");
        }
      } catch (error) {
        console.error("Error saving support request:", error);
      }

      onClose();
      router.push(`/troubleshoot/${selectedBrand}`);
    } else {
      alert("Please select a printer brand to continue");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8 relative animate-fadeIn max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy mb-2">
            Chat Support Team
          </h2>
          
          {/* Team Member */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-6 py-3">
              <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">AM</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-navy">Alex M.</p>
                <p className="text-sm text-gray-600">Support Specialist</p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <p className="text-lg text-gray-700 font-medium mb-6">
            We have resolved over <span className="text-navy font-semibold">10,878</span> issues.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-navy mb-4 text-center">
            Get Your Solutions Just Answer Below Questions
          </h3>

          {/* Question 1 */}
          <div>
            <label className="block text-base font-semibold text-navy mb-4">
              Q1. Please Select the Brand of your Printer
            </label>

            {/* Printer Brand Logos */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {printerBrands.map((brand) => (
                <button
                  key={brand.slug}
                  onClick={() => setSelectedBrand(brand.slug)}
                  className={`group relative bg-white border-2 rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ${
                    selectedBrand === brand.slug
                      ? "border-navy ring-2 ring-navy ring-opacity-20 shadow-lg scale-105"
                      : "border-gray-200 hover:border-navy"
                  }`}
                >
                  {/* Selected Indicator */}
                  {selectedBrand === brand.slug && (
                    <div className="absolute -top-2 -right-2 bg-navy text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md z-10">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}

                  {/* Logo Container */}
                  <div className={`aspect-square flex items-center justify-center mb-1.5 transition-all duration-300 ${
                    selectedBrand === brand.slug ? "scale-105" : "group-hover:scale-102"
                  }`}>
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="max-w-[70%] max-h-[70%] object-contain filter drop-shadow-sm"
                    />
                  </div>

                  {/* Brand Name */}
                  <div className="text-center">
                    <p className={`font-semibold text-xs transition-colors duration-300 ${
                      selectedBrand === brand.slug ? "text-navy" : "text-gray-600 group-hover:text-navy"
                    }`}>
                      {brand.name}
                    </p>
                  </div>

                  {/* Hover Overlay Effect */}
                  {selectedBrand !== brand.slug && (
                    <div className="absolute inset-0 bg-gradient-to-br from-navy/0 to-navy/0 group-hover:from-navy/5 group-hover:to-transparent rounded-lg transition-all duration-300 pointer-events-none" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleNext}
            className="flex-1 bg-navy hover:bg-blue-800 text-white font-semibold text-base px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedBrand}
          >
            NEXT
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-base px-6 py-3 rounded-lg transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStartedModal;

