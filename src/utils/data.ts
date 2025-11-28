export type ServiceCategory =
  | "setup"
  | "troubleshooting"
  | "network"
  | "maintenance"
  | "emergency";

export type Service = {
  title: string;
  description: string;
  slug: string;
  category: ServiceCategory;
};

export const servicesList: Service[] = [
  {
    title: "Printer Setup & Installation",
    description:
      "On-site and remote deployment, fleet configuration, and driver installation for every major printer manufacturer.",
    slug: "printer-setup",
    category: "setup",
  },
  {
    title: "Troubleshooting & Repair",
    description:
      "Same-day diagnostics, and firmware fixes that eliminate recurring jams and error codes.",
    slug: "troubleshooting",
    category: "troubleshooting",
  },
  {
    title: "Network Connectivity",
    description:
      "Secure wireless and Ethernet configuration, print server hardening, and zero-trust access controls.",
    slug: "network-printing",
    category: "network",
  },
  {
    title: "Driver Installation",
    description:
      "Driver setup for Windows and macOS endpoints",
    slug: "driver-installation",
    category: "setup",
  },
  {
    title: "Maintenance & Support",
    description:
      "Quarterly tune-ups, consumable forecasting, and SLA-backed help desk coverage.",
    slug: "maintenance",
    category: "maintenance",
  },
  {
    title: "Emergency Support",
    description:
      "24/7 hotlines, remote screen share, and rapid-dispatch engineers for outages and jammed queues.",
    slug: "emergency",
    category: "emergency",
  },
];

export const serviceBenefits = [
  {
    title: "24/7 Customer Support",
    description: "Live technicians in the USA and UK to keep printers online.",
  },
  {
    title: "Certified Technicians",
    description: "HP, Canon, Brother, and Lexmark certified senior engineers.",
  },
  {
    title: "Fast Response Time",
    description: "< 1-hour average response with proactive status updates.",
  },
];

export const faqContent = [
  {
    question: "How fast can PrintAlliance respond?",
    answer:
      "Response times average 38 minutes for remote tickets and under 2 hours for on-site dispatch in major metros.",
    category: "General",
  },
  {
    question: "Do you support both USA and UK offices?",
    answer:
      "Yes, we have distributed teams covering all US states and all regions of the UK, providing comprehensive support nationwide.",
    category: "Service Areas",
  },
  {
    question: "Can you work with managed print service contracts?",
    answer:
      "Absolutely. We integrate with existing MPS agreements and coordinate with OEM partners to preserve warranties.",
    category: "Services",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "Legal, healthcare, finance, logistics, and enterprise campus environments that cannot tolerate downtime.",
    category: "General",
  },
  {
    question: "Do you offer flat-rate pricing?",
    answer:
      "Yes. Choose from per-incident, bundled hours, or unlimited plans for predictable budgeting.",
    category: "Pricing",
  },
];

export const serviceAreas = {
  usa: "All US States",
  uk: "All UK Regions",
};

export const serviceDetails = {
  "printer-setup": {
    hero:
      "Deploy company-wide printers with zero chaos. From site surveys to driver rollouts, we own every milestone.",
    benefits: [
      "OEM-certified installs for HP, Canon, Brother, Lexmark.",
      "Driver packaging for Windows, macOS, and Linux.",
      "Secure network onboarding with role-based access.",
    ],
    steps: [
      "Audit environment & cabling plan",
      "Configure print servers & queues",
      "Deploy drivers via Intune/JAMF",
      "Onboard users and verify output",
    ],
    pricing: ["Per-device setup from $149", "Bulk rollout discounts", "Week-of launch hypercare"],
    faq: [
      {
        question: "Can you coordinate after business hours?",
        answer: "Yes, we schedule overnight or weekend cutovers for zero disruption.",
      },
    ],
  },
  troubleshooting: {
    hero:
      "Eliminate jams, streaks, and ‘printer offline’ alerts before they impact revenue teams.",
    benefits: [
      "Remote diagnostics with live screen share",
      "On-site dispatch in major USA & UK metros",
    ],
    steps: [
      "Remote triage & log analysis",
      "Part identification & courier",
      "On-site repair or replacement",
      "Root-cause report & prevention plan",
    ],
    pricing: [
      "Per-incident from $189",
      "Block hour bundles with rollover",
      "Unlimited plan with SLA credits",
    ],
    faq: [
      {
        question: "Do repairs void warranties?",
        answer:
          "No, our certified engineers follow OEM guidelines and document every change for compliance.",
      },
    ],
  },
  "network-printing": {
    hero:
      "Secure cloud and on-prem printing with zero trust policies that pass every audit.",
    benefits: [
      "802.1X, VPN, and zero trust ready configurations",
      "Print server hardening & logging",
      "Handoff to your network or security team",
    ],
    steps: [
      "Architect topology & access policies",
      "Configure servers, queues, and certificates",
      "Pilot with sample users",
      "Document and train administrators",
    ],
    pricing: [
      "Assessment from $1,200",
      "Managed print server retainer",
      "Hardened cloud print clusters",
    ],
    faq: [
      {
        question: "Can you integrate with Azure AD or Okta?",
        answer: "Yes. We configure conditional access, MFA, and role-based controls.",
      },
    ],
  },
  "driver-installation": {
    hero:
      "Automate driver updates so compliance teams never chase outdated builds again.",
    benefits: [
      "Driver packaging for SCCM, Intune, JAMF",
      "Version monitoring & rollback library",
      "Testing lab for Windows, macOS, Linux",
    ],
    steps: [
      "Inventory current drivers",
      "Package signed drivers",
      "Deploy & monitor fleet rollout",
      "Report compliance status",
    ],
    pricing: [
      "Driver catalog subscription",
      "Per-update labor blocks",
      "Managed compliance retainer",
    ],
    faq: [
      {
        question: "Do you support virtual desktop environments?",
        answer: "Yes, including Citrix, VMware, and Windows 365 multi-session hosts.",
      },
    ],
  },
  maintenance: {
    hero:
      "Predictive printer maintenance that prevents downtime and optimizes consumable spend.",
    benefits: [
      "Quarterly on-site wellness checks",
      "Consumable forecasting with auto-ship",
      "Firmware governance & reporting",
    ],
    steps: [
      "Health assessment & baseline metrics",
      "Consumable & parts forecasting",
      "Proactive replacements",
      "Executive-ready uptime reporting",
    ],
    pricing: [
      "Per-device coverage from $29/mo",
      "Hybrid remote & onsite plans",
      "Custom SLAs for enterprise fleets",
    ],
    faq: [
      {
        question: "Can you integrate with our ITSM?",
        answer:
          "Yes, we plug into ServiceNow, Jira Service Management, Zendesk, and more for automated ticket sync.",
      },
    ],
  },
  emergency: {
    hero:
      "Mission-critical outages resolved by senior engineers any hour, any day.",
    benefits: [
      "Emergency hotline answered in 3 rings",
      "Loaner printers staged in major metros",
      "Root-cause report within 24 hours",
    ],
    steps: [
      "Stabilize or provide loaner",
      "Repair or replace hardware",
      "Post-incident RCA",
      "Executive summary with prevention plan",
    ],
    pricing: [
      "24/7 retainer plans",
      "Incident packs with guaranteed dispatch",
      "Enterprise DR runbooks",
    ],
    faq: [
      {
        question: "Do you support regulated industries?",
        answer:
          "Yes. Our teams are background-checked and trained for HIPAA, SOX, and PCI environments.",
      },
    ],
  },
};


