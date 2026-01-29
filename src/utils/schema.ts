import { siteUrl } from "./seo";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PrintAlliance",
  url: siteUrl,
  logo: `${siteUrl}/images/logo.svg`,
  description:
    "PrintAlliance provides professional printer repair, setup, and managed services.",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1-325-219-5205",
      contactType: "customer service",
      areaServed: ["US", "GB"],
      availableLanguage: ["en"],
    },
  ],
  sameAs: [
    "https://www.facebook.com/printalliance",
    "https://www.linkedin.com/company/printalliance",
    "https://twitter.com/printalliance",
  ],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "PrintAlliance",
  image: `${siteUrl}/images/printalliance-logo.png`,
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
  areaServed: ["US", "GB"],
  url: siteUrl,
  telephone: "+1-325-219-5205",
  openingHours: "Mo-Su 00:00-23:59",
};

export const buildServiceSchema = ({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: name,
  description,
  provider: {
    "@type": "Organization",
    name: "PrintAlliance",
    url: siteUrl,
  },
  areaServed: ["US", "GB"],
  url,
});

export const buildFaqSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

export const buildBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PrintAlliance",
  url: siteUrl,
  description:
    "Professional printer repair, setup, and managed services. 24/7 support for HP, Brother, Epson, and Canon printers.",
  publisher: {
    "@type": "Organization",
    name: "PrintAlliance",
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/images/logo.svg`,
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: ["en"],
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Global",
  },
};

export const serviceProviderSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Printer Repair and Support Services",
  provider: {
    "@type": "Organization",
    name: "PrintAlliance",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.svg`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-325-219-5205",
        contactType: "customer service",
        areaServed: ["Worldwide"],
        availableLanguage: ["English"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      },
    ],
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Global",
  },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: siteUrl,
    servicePhone: "+1-325-219-5205",
    serviceEmail: "Support@printalliance.net",
  },
};


