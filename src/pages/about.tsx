import Head from "next/head";
import CTA from "@/components/CTA";
import { siteUrl } from "@/utils/seo";

const statistics = [
  { label: "Devices managed", value: "5,400+" },
  { label: "Issues resolved", value: "32,000+" },
  { label: "Avg. uptime", value: "99.7%" },
  { label: "Customer rating", value: "4.9/5" },
];

const AboutPage = () => (
  <>
    <Head>
      <title>About PrintAlliance | Certified Printer Experts</title>
      <meta
        name="description"
        content="PrintAlliance delivers enterprise-grade printer setup, maintenance, and emergency support backed by certified engineers in the USA and UK."
      />
      <link rel="canonical" href={`${siteUrl}/about`} />
      <meta property="og:title" content="About PrintAlliance" />
      <meta
        property="og:description"
        content="Meet the engineers, mission, and certifications powering PrintAlliance."
      />
      <meta property="og:url" content={`${siteUrl}/about`} />
      <meta property="og:image" content={`${siteUrl}/images/og-default.svg`} />
    </Head>
    <section className="section-padding">
      <div className="mx-auto max-w-5xl px-4 text-center lg:px-0">
        <p className="highlight-bar justify-center">Our story</p>
        <h1 className="mt-4 text-4xl font-bold text-navy">
          Aligning USA & UK businesses with printer uptime
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Founded by former OEM field engineers, PrintAlliance combines remote
          diagnostics, on-site expertise, and proactive maintenance to keep
          distributed teams productive.
        </p>
      </div>
      <div className="mx-auto mt-12 grid max-w-6xl gap-8 px-4 lg:px-8">
        <div className="grid gap-6 surface p-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-navy">Mission</h2>
            <p className="mt-3 text-gray-600">
              To eliminate printer downtime through predictive maintenance,
              elite remediation teams, and transparent communication.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-navy">Vision</h2>
            <p className="mt-3 text-gray-600">
              Become the most trusted global partner for mission-critical
              printer infrastructure, from SMB offices to multinational HQs.
            </p>
          </div>
        </div>
        <div className="grid gap-6 rounded-3xl bg-gray-light p-8 md:grid-cols-4">
          {statistics.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-navy">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <CTA />
  </>
);

export default AboutPage;

