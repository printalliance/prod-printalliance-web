export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.printalliance.com";

type MetaInput = {
  title: string;
  description: string;
  keywords: string;
  path: string;
};

const baseMeta: Record<string, MetaInput> = {
  "/": {
    title: "Professional Printer Services for USA & UK | PrintAlliance",
    description:
      "PrintAlliance delivers 24/7 printer repair, setup, and managed support across the USA and UK. Certified technicians, rapid response, and proactive maintenance.",
    keywords:
      "printer services, printer repair, printer support, printer troubleshooting USA, printer help UK",
    path: "/",
  },
  "/services": {
    title: "Comprehensive Printer Services | PrintAlliance",
    description:
      "Explore printer setup, troubleshooting, networking, maintenance, and emergency repair solutions backed by certified PrintAlliance technicians.",
    keywords:
      "printer services, printer setup, printer repair, printer maintenance",
    path: "/services",
  },
  "/about": {
    title: "About PrintAlliance | Certified Printer Experts",
    description:
      "Learn about PrintAlliance’s mission, leadership team, certifications, and 20+ years of combined printer support experience.",
    keywords: "about printer service, printer experts, managed print partner",
    path: "/about",
  },
  "/pricing": {
    title: "Printer Support Pricing & Plans | PrintAlliance",
    description:
      "Compare on-demand, managed, and enterprise printer support plans for USA & UK locations. Transparent pricing and SLA-backed coverage.",
    keywords: "printer service pricing, managed print cost, printer support plans",
    path: "/pricing",
  },
  "/faq": {
    title: "Printer Support FAQ | PrintAlliance",
    description:
      "Find answers to common printer troubleshooting, pricing, coverage, and onboarding questions for USA & UK customers.",
    keywords: "printer faq, printer troubleshooting answers, printer support help",
    path: "/faq",
  },
  "/service-areas": {
    title: "USA & UK Service Areas | PrintAlliance",
    description:
      "PrintAlliance provides comprehensive printer support services across all US states and all UK regions with rapid response times.",
    keywords: "printer service areas USA, printer support UK",
    path: "/service-areas",
  },
  "/privacy": {
    title: "Privacy Policy | PrintAlliance",
    description:
      "Understand how PrintAlliance secures personal information, complies with GDPR, and handles data for USA & UK clients.",
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
    keywords: "printer setup service, printer installation usa uk",
    path: "/services/printer-setup",
  },
  "/services/troubleshooting": {
    title: "Printer Troubleshooting & Repair | PrintAlliance",
    description:
      "Eliminate error codes, paper jams, and print quality issues with rapid diagnostics and replacement parts.",
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
      "24/7 emergency dispatch, remote triage, and on-site engineers who restore mission critical printers fast.",
    keywords: "emergency printer repair, 24/7 printer support",
    path: "/services/emergency",
  },
};

export const defaultMeta = (path: string) => {
  const meta = baseMeta[path as keyof typeof baseMeta] ?? baseMeta["/"];
  return {
    ...meta,
    canonical: `${siteUrl.replace(/\/$/, "")}${path}`,
    ogImage: `${siteUrl.replace(/\/$/, "")}/images/og-default.svg`,
  };
};

export const buildSchemaScript = (schema: Record<string, unknown>) =>
  JSON.stringify(schema);

