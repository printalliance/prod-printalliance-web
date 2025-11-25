import { useState } from "react";
import Head from "next/head";
import ServiceCard from "@/components/ServiceCard";
import CTA from "@/components/CTA";
import { servicesList } from "@/utils/data";
import { siteUrl } from "@/utils/seo";

const filters = [
  { label: "All", value: "all" },
  { label: "Setup", value: "setup" },
  { label: "Troubleshooting", value: "troubleshooting" },
  { label: "Network", value: "network" },
  { label: "Maintenance", value: "maintenance" },
  { label: "Emergency", value: "emergency" },
];

const ServicesPage = () => {
  const [filter, setFilter] = useState("all");
  const filtered =
    filter === "all"
      ? servicesList
      : servicesList.filter((service) => service.category === filter);

  return (
    <>
      <Head>
        <title>Our Comprehensive Printer Services | PrintAlliance</title>
        <meta
          name="description"
          content="Explore printer setup, troubleshooting, networking, driver management, maintenance, and emergency services crafted for USA & UK teams."
        />
        <link rel="canonical" href={`${siteUrl}/services`} />
        <meta property="og:title" content="PrintAlliance Services" />
        <meta
          property="og:description"
          content="View managed printer services with 24/7 coverage."
        />
        <meta property="og:url" content={`${siteUrl}/services`} />
        <meta property="og:image" content={`${siteUrl}/images/og-default.svg`} />
      </Head>
      <section className="section-padding">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <p className="highlight-bar">Service catalog</p>
          <h1 className="mt-4 text-4xl font-bold text-navy">
            Our comprehensive printer services
          </h1>
          <p className="mt-3 text-gray-600">
            Flexible plans for SMBs and enterprises. Select a category to see
            exactly how we can support your fleet.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {filters.map((item) => (
              <button
                key={item.value}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  filter === item.value
                    ? "bg-red text-white"
                    : "bg-gray-light text-navy"
                }`}
                onClick={() => setFilter(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
};

export default ServicesPage;

