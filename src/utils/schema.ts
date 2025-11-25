import { siteUrl } from "./seo";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PrintAlliance",
  url: siteUrl,
  logo: `${siteUrl}/images/logo.svg`,
  description:
    "PrintAlliance provides professional printer repair, setup, and managed services across the USA and UK.",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1-210-512-8406",
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
  image: `${siteUrl}/images/og-default.svg`,
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
  areaServed: ["US", "GB"],
  url: siteUrl,
  telephone: "+1-210-512-8406",
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


