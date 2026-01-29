export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.printalliance.com";

export const defaultOgImage = `${siteUrl}/images/printalliance-logo.png`;
export const defaultFavicon = `https://raw.githubusercontent.com/printalliance/public-images/refs/heads/main/fevicon.png`;
export const defaultTwitterHandle = "@printalliance";

type MetaInput = {
  title: string;
  description: string;
  keywords: string;
  path: string;
  ogImage?: string;
  geo?: {
    region?: string;
    placename?: string;
  };
};

const baseMeta: Record<string, MetaInput> = {
  "/": {
    title: "Professional Printer Support Services | PrintAlliance",
    description:
      "PrintAlliance delivers 24/7 printer repair, setup, and managed support services. Certified technicians, rapid response, and proactive maintenance. Get expert help for HP, Brother, Epson, and Canon printers.",
    keywords:
      "printer support, printer repair, printer troubleshooting, HP printer support, Brother printer repair, Epson printer help, Canon printer service, printer setup, wireless printer setup, connectivity fixes, 24/7 printer support, printer maintenance, managed print services, printer technician, printer expert, printer troubleshooting guide, printer error codes, network printer setup, printer driver installation",
    path: "/",
  },
  "/services": {
    title: "Comprehensive Printer Services | PrintAlliance",
    description:
      "Explore printer setup, troubleshooting, networking, maintenance, and emergency repair solutions backed by certified PrintAlliance technicians. Available 24/7 with expert support.",
    keywords:
      "printer services, printer setup, printer repair, printer maintenance, printer troubleshooting, network printer setup, printer driver installation, emergency printer repair, printer support services, managed print services, printer installation, printer configuration, printer diagnostics, printer error fixing",
    path: "/services",
  },
  "/about": {
    title: "About PrintAlliance | Certified Printer Experts",
    description:
      "Learn about PrintAlliance’s mission, leadership team, certifications, and 20+ years of combined printer support experience.",
    keywords: "about printer service, printer experts, managed print partner",
    path: "/about",
  },
  "/support": {
    title: "Support Plans & Services | PrintAlliance",
    description:
      "Choose from Basic, Comprehensive, or Perpetual support plans. Get expert printer and device support with transparent pricing and guaranteed fixes.",
    keywords:
      "printer support plans, device support, technical support services, printer support packages, printer maintenance plans, printer service plans, printer support subscription, printer help plans, printer assistance plans, printer support pricing, printer support cost",
    path: "/support",
  },
  "/faq": {
    title: "Printer Support FAQ | PrintAlliance",
    description:
      "Find answers to common printer troubleshooting, pricing, coverage, and onboarding questions.",
    keywords: "printer faq, printer troubleshooting answers, printer support help",
    path: "/faq",
  },
  "/service-areas": {
    title: "Service Areas | PrintAlliance",
    description:
      "PrintAlliance provides comprehensive printer support services globally with rapid response times.",
    keywords: "printer service areas, global printer support",
    path: "/service-areas",
  },
  "/privacy": {
    title: "Privacy Policy | PrintAlliance",
    description:
      "Understand how PrintAlliance secures personal information, complies with GDPR, and handles data.",
    keywords: "printer privacy policy, gdpr printer services",
    path: "/privacy",
  },
  "/terms": {
    title: "Terms of Service | PrintAlliance",
    description:
      "Review PrintAlliance service terms, SLAs, and acceptable use for managed printer support engagements.",
    keywords: "printer services terms, managed print agreement",
    path: "/terms",
  },
  "/services/printer-setup": {
    title: "Printer Setup & Installation Services | PrintAlliance",
    description:
      "Deploy printers faster with OEM-certified technicians handling configuration, driver rollout, and fleet onboarding.",
    keywords: "printer setup service, printer installation service",
    path: "/services/printer-setup",
  },
  "/services/troubleshooting": {
    title: "Printer Troubleshooting & Repair | PrintAlliance",
    description:
      "Eliminate error codes, paper jams, and print quality issues with rapid diagnostics.",
    keywords: "printer troubleshooting, printer repair service",
    path: "/services/troubleshooting",
  },
  "/services/network-printing": {
    title: "Network Printer Configuration | PrintAlliance",
    description:
      "Secure wireless and Ethernet printer connectivity, print server hardening, and zero-trust printing workflows.",
    keywords: "network printer setup, secure printer connectivity",
    path: "/services/network-printing",
  },
  "/services/driver-installation": {
    title: "Printer Driver Installation & Updates | PrintAlliance",
    description:
      "Automate driver deployment and ensure compliance across Windows, macOS, and Linux fleets.",
    keywords: "printer driver updates, printer driver installation",
    path: "/services/driver-installation",
  },
  "/services/maintenance": {
    title: "Printer Maintenance & Managed Support | PrintAlliance",
    description:
      "Quarterly maintenance, consumables forecasting, and SLA-backed help desk for reliable printer uptime.",
    keywords: "printer maintenance service, managed printer support",
    path: "/services/maintenance",
  },
  "/services/emergency": {
    title: "Emergency Printer Support | PrintAlliance",
    description:
      "24/7 emergency dispatch, remote triage, and rapid support to restore mission critical printers fast.",
    keywords: "emergency printer repair, 24/7 printer support",
    path: "/services/emergency",
  },
};

export const defaultMeta = (path: string) => {
  const meta = baseMeta[path as keyof typeof baseMeta] ?? baseMeta["/"];
  return {
    ...meta,
    canonical: `${siteUrl.replace(/\/$/, "")}${path}`,
    ogImage: meta.ogImage || `${siteUrl.replace(/\/$/, "")}/images/printalliance-logo.png`,
  };
};

// Generate hreflang tags
export const generateHreflang = (path: string) => [
  { lang: "en", url: `${siteUrl}${path}` },
  { lang: "x-default", url: `${siteUrl}${path}` },
];

export const buildSchemaScript = (schema: Record<string, unknown>) =>
  JSON.stringify(schema);

