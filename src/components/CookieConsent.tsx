import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/common/Button";

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, string>,
    ) => void;
  }
}

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check localStorage after mount to avoid hydration mismatch
    const checkConsent = () => {
      const consent = localStorage.getItem("cookieConsent");
      if (!consent) {
        setShowBanner(true);
      }
    };
    // Use setTimeout to defer state update and satisfy linter
    const timer = setTimeout(checkConsent, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    if (typeof window === "undefined") return;
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("cookieConsentDate", new Date().toISOString());
    setShowBanner(false);

    // Enable Google Analytics/Ads tracking
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
    }
  };

  const handleReject = () => {
    if (typeof window === "undefined") return;
    localStorage.setItem("cookieConsent", "rejected");
    localStorage.setItem("cookieConsentDate", new Date().toISOString());
    setShowBanner(false);

    // Disable Google Analytics/Ads tracking
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-navy/20 bg-white p-4 shadow-[0_-4px_20px_rgba(0,31,63,0.15)] md:p-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-navy">Cookie Preferences</h3>
          <p className="mt-1 text-sm text-gray-600">
            We use cookies to improve your experience, analyze site traffic, and
            support our advertising campaigns. By clicking &quot;Accept&quot;, you
            consent to our use of cookies. You can change your preferences at any
            time.{" "}
            <Link
              href="/privacy"
              className="font-semibold text-red underline hover:text-red/80"
            >
              Learn more
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="secondary"
            onClick={handleReject}
            className="whitespace-nowrap border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Reject Cookies
          </Button>
          <Button onClick={handleAccept} className="whitespace-nowrap">
            Accept Cookies
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

