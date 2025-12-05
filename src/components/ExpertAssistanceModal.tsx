import { useEffect, useState } from "react";

interface ExpertAssistanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExpertAssistanceModal = ({ isOpen, onClose }: ExpertAssistanceModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-3xl font-bold text-navy mb-6 text-center">
          Need Expert Assistance?
        </h3>

        <div className="space-y-4 text-center">
          <p className="text-gray-700 leading-relaxed">
            Our Basic Troubleshoot Support has a 50% resolution rate. To avail our instant Basic troubleshoot support
          </p>

          <div className="bg-blue-50 rounded-xl p-6 space-y-3">
            <p className="font-semibold text-navy mb-3">📞 Call us on:</p>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              <a href="tel:+12105128406" className="text-blue-600 hover:text-blue-800 font-medium text-2xl">
                +1-325-219-5205
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-700">
              If the issue is not resolved with basic troubleshooting we also provide
            </p>
            <p className="text-xl font-bold text-red mt-2">
              ADVANCED TROUBLESHOOT SUPPORT
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-navy hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ExpertAssistanceModal;

