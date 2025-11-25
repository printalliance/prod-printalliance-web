import ReactGA from "react-ga4";

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

let isInitialized = false;

export const initGA = () => {
  if (typeof window === "undefined") return;
  if (!GA_TRACKING_ID || isInitialized) return;
  
  // Check cookie consent before initializing
  const consent = localStorage.getItem("cookieConsent");
  if (consent === "rejected") return;
  
  ReactGA.initialize(GA_TRACKING_ID);
  isInitialized = true;
};

export const logPageView = (url: string) => {
  if (typeof window === "undefined") return;
  if (!GA_TRACKING_ID) return;
  const consent = localStorage.getItem("cookieConsent");
  if (consent === "rejected") return;
  initGA();
  ReactGA.send({ hitType: "pageview", page: url });
};

export const logEvent = (action: string, params: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  if (!GA_TRACKING_ID) return;
  const consent = localStorage.getItem("cookieConsent");
  if (consent === "rejected") return;
  initGA();
  ReactGA.event(action, params);
};

