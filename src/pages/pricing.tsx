import Head from "next/head";
import CTA from "@/components/CTA";
import Button from "@/components/common/Button";
import { siteUrl } from "@/utils/seo";

const plans = [
  {
    name: "On-Demand",
    price: "$189 / incident",
    description: "Pay-as-you-go support for teams with occasional issues.",
    features: [
      "Remote triage & guided fixes",
      "On-site dispatch at local rates",
    ],
  },
  {
    name: "Managed Fleet",
    price: "From $29 / device",
    description: "Proactive maintenance for growing businesses.",
    features: [
      "Quarterly inspections & cleaning",
      "Consumable forecasting & auto-ship",
      "24/7 help desk & remote remediation",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise SLA",
    price: "Custom quote",
    description: "Dedicated technicians, analytics, and strategy.",
    features: [
      "Global coverage with DR planning",
      "Integrated ITSM workflows",
      "Executive uptime reporting",
    ],
  },
];

const PricingPage = () => (
  <>
    <Head>
      <title>Printer Support Pricing & Plans | PrintAlliance</title>
      <meta
        name="description"
        content="Compare on-demand, managed, and enterprise printer support packages with SLA-backed response times."
      />
      <link rel="canonical" href={`${siteUrl}/pricing`} />
      <meta property="og:title" content="PrintAlliance Pricing" />
      <meta
        property="og:description"
        content="Flexible printer service plans for USA and UK organizations."
      />
      <meta property="og:url" content={`${siteUrl}/pricing`} />
      <meta property="og:image" content={`${siteUrl}/images/og-default.svg`} />
    </Head>
    <section className="section-padding bg-gray-light">
      <div className="mx-auto max-w-5xl text-center">
        <p className="highlight-bar justify-center">Pricing</p>
        <h1 className="mt-4 text-4xl font-bold text-navy">
          Flexible plans for every office
        </h1>
        <p className="mt-3 text-gray-600">
          Scale coverage from a single satellite office to multinational
          headquarters with transparent pricing and add-ons.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-6xl gap-6 px-4 lg:grid-cols-3">
        {plans.map((plan) => (
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
            <p className="mt-3 text-3xl font-bold text-navy">{plan.price}</p>
            <p className="mt-2 text-gray-600">{plan.description}</p>
            <ul className="mt-5 space-y-2 text-sm text-gray-700">
              {plan.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
            <Button
              className="mt-6"
              variant={plan.highlighted ? "primary" : "secondary"}
              href="tel:+12105128406"
            >
              Call for Quote
            </Button>
          </div>
        ))}
      </div>
    </section>
    <CTA />
  </>
);

export default PricingPage;

