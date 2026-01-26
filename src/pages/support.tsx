import { useState } from "react";
import CTA from "@/components/CTA";
import Button from "@/components/common/Button";
import SupportPlanModal from "@/components/SupportPlanModal";
import SEO from "@/components/SEO";
import { defaultMeta, generateHreflang } from "@/utils/seo";
import { buildServiceSchema, buildBreadcrumbSchema } from "@/utils/schema";

const supportPlans = [
  {
    name: "BASIC",
    title: "Basic Support Plan",
    fixation: "One-time fix included",
    coverage: "1 year",
    issues: [
      "Connectivity issues",
      "New printer setup assistance",
      "Printer won't print errors",
    ],
    devices: "Unlimited printers",
    benefits: [
      "24/7 customer support via chat and email",
      "Remote troubleshooting capabilities",
      "Basic printer connectivity guidance",
    ],
  },
  {
    name: "COMPREHENSIVE",
    title: "Comprehensive Support Plan",
    fixation: "One-time fix included",
    coverage: "2 years",
    issues: [
      "Connectivity issues",
      "New printer setup assistance",
      "Printer won't print errors",
      "Slow computer performance",
      "Operating system updates",
      "Software removal and installations",
      "Data backup and recovery assistance",
      "Email configuration & troubleshooting",
      "Antivirus installation and optimization",
    ],
    devices: "Unlimited (Printers & Computers)",
    benefits: [
      "24/7 priority support (phone, chat, and email)",
      "Remote diagnostics and issue resolution",
      "Personalized optimization recommendations",
      "Periodic software health checkups",
      "Assistance with security patches and firewall settings",
    ],
    highlighted: true,
  },
  {
    name: "PERPETUAL",
    title: "Perpetual Support Plan",
    fixation: "One-time fix included",
    coverage: "5 years",
    issues: [
      "All features of the Comprehensive Support Plan",
      "Tablet and iPad support (setup, OS updates, app troubleshooting)",
      "Smart TV troubleshooting (connectivity, app issues, updates)",
      "Cutting & Designing Machines setup and troubleshooting",
      "Cloud storage setup and synchronization",
      "Peripheral device support (scanners, webcams, microphones, etc.)",
      "Device connectivity issues (Wi-Fi, Bluetooth, router setup & troubleshooting)",
      "Email and account security support",
      "Custom software installation guidance",
    ],
    devices: "Unlimited devices",
    benefits: [
      "24/7 dedicated VIP customer support with priority handling",
      "Personalized device performance optimization",
      "Annual deep system checkup",
      "Advanced troubleshooting & recovery support",
      "Proactive security monitoring",
      "Free device health reports every 6 months",
      "Exclusive discounts on future service upgrades",
    ],
  },
];

const comparisonFeatures = [
  {
    feature: "Convenience",
    retail: "Time-Consuming & Inconvenient: You need to schedule an appointment, wait for a technician to arrive, or visit the store yourself.",
    printMeNow: "Instant expert assistance - No waiting or scheduling needed.",
  },
  {
    feature: "Cost",
    retail: "High Costs: You pay for the home visit plus hourly charges, regardless of the complexity of the issue.",
    printMeNow: "Flat-rate pricing - No hidden fees.",
  },
  {
    feature: "Service Guarantee",
    retail: "No fix? You still pay for the visit.",
    printMeNow: "No fix, no charge guarantee.",
  },
  {
    feature: "Warranty",
    retail: "Limited or no warranty (usually 7 days).",
    printMeNow: "1-year backup support for printer issues.",
  },
  {
    feature: "Support Scope",
    retail: "Basic troubleshooting, limited to store capabilities.",
    printMeNow: "Comprehensive support, including new setup, connectivity errors, and connectivity issues.",
  },
  {
    feature: "Transparency",
    retail: "Additional costs may apply for complex issues.",
    printMeNow: "Transparent pricing with zero risk.",
  },
  {
    feature: "Overall Value",
    retail: "Short-term solutions, potential repeat costs.",
    printMeNow: "Long-term support and expert guidance.",
  },
];

const SupportPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    title: string;
  } | null>(null);

  const handleGetStarted = (planName: string, planTitle: string) => {
    setSelectedPlan({ name: planName, title: planTitle });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPlan(null);
  };

  const meta = defaultMeta("/support");
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: `${meta.canonical.replace("/support", "")}` },
    { name: "Support Plans", url: meta.canonical },
  ]);
  const serviceSchema = buildServiceSchema({
    name: "Printer Support Plans",
    description: meta.description,
    url: meta.canonical,
  });
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, serviceSchema],
  };

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        canonical={meta.path}
        ogImage={meta.ogImage}
        ogType="website"
        hreflang={generateHreflang(meta.path)}
        geo={meta.geo}
        schema={combinedSchema}
      />
    <section className="section-padding bg-gray-light">
      <div className="mx-auto max-w-5xl text-center">
        <p className="highlight-bar justify-center">Support Plans</p>
        <h1 className="mt-4 text-4xl font-bold text-navy">
          🛟 Our Support Plans
        </h1>
        <p className="mt-3 text-gray-600">
          Choose the right support plan for your needs. All plans include
          one-time fix and comprehensive coverage.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-6xl gap-6 px-4 lg:grid-cols-3">
        {supportPlans.map((plan) => (
          <div
            key={plan.name}
            className={`surface p-8 ${
              plan.highlighted
                ? "border-red shadow-[0_30px_80px_rgba(230,57,70,0.25)]"
                : ""
            }`}
          >
            <p className="text-sm uppercase tracking-wide text-gray-500">
              {plan.name}
            </p>
            <h3 className="mt-3 text-xl font-bold text-navy">{plan.title}</h3>
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="font-semibold">Today's Fixation:</span>{" "}
                {plan.fixation}
              </p>
              <p>
                <span className="font-semibold">Support Coverage:</span>{" "}
                {plan.coverage}
              </p>
            </div>
            <div className="mt-5">
              <p className="font-semibold text-gray-700">📋 Issues Covered:</p>
              <ul className="mt-2 space-y-1.5 text-sm text-gray-600">
                {plan.issues.map((issue, idx) => (
                  <li key={idx}>✓ {issue}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <p className="font-semibold text-gray-700">
                💻 Number of Devices Covered:
              </p>
              <p className="mt-1 text-sm text-gray-600">{plan.devices}</p>
            </div>
            <div className="mt-5">
              <p className="font-semibold text-gray-700">⭐ Additional Benefits:</p>
              <ul className="mt-2 space-y-1.5 text-sm text-gray-600">
                {plan.benefits.map((benefit, idx) => (
                  <li key={idx}>✓ {benefit}</li>
                ))}
              </ul>
            </div>
            <Button
              className="mt-6"
              variant={plan.highlighted ? "primary" : "secondary"}
              onClick={() => handleGetStarted(plan.name, plan.title)}
            >
              Get Started
            </Button>
          </div>
        ))}
      </div>
    </section>

    <section className="section-padding bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy">
            🏪 Retail Stores vs 🎯 Our Tier-2 Support
          </h2>
          <p className="mt-3 text-gray-600">
            See why our support stands out from traditional retail store
            technicians
          </p>
        </div>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-navy">
                  Feature
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-navy">
                  🏪 Retail Store Technicians (Curry's, Best Buy, Local Stores,
                  etc.)
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-navy">
                  ⚡ Tier-2 Support – Fast, Reliable & Cost-Effective
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-700">
                    {item.feature}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-600">
                    ❌ {item.retail}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-600">
                    ✅ {item.printMeNow}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <CTA />
    {selectedPlan && (
      <SupportPlanModal
        open={modalOpen}
        onClose={handleCloseModal}
        planName={selectedPlan.name}
        planTitle={selectedPlan.title}
      />
    )}
  </>
  );
};

export default SupportPage;

