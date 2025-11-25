import Head from "next/head";
import { siteUrl } from "@/utils/seo";

const PrivacyPage = () => (
  <>
    <Head>
      <title>Privacy Policy | PrintAlliance</title>
      <meta
        name="description"
        content="Learn how PrintAlliance collects, protects, and uses data to comply with GDPR and CCPA requirements."
      />
      <link rel="canonical" href={`${siteUrl}/privacy`} />
    </Head>
    <section className="section-padding">
      <div className="mx-auto max-w-4xl space-y-6 px-4">
        <h1 className="text-4xl font-bold text-navy">Privacy Policy</h1>
        <p className="text-gray-600">
          PrintAlliance respects your privacy. This policy explains how we
          collect and protect personal data for USA and UK users.
        </p>
        <section>
          <h2 className="text-2xl font-semibold text-navy">Data collected</h2>
          <p className="mt-2 text-gray-700">
            Contact details, device information, and service history submitted
            via forms, tickets, and remote monitoring tools.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-navy">How data is used</h2>
          <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-700">
            <li>Provide support and maintenance services</li>
            <li>Send operational updates and invoices</li>
            <li>Improve reliability through analytics</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-navy">
            GDPR &amp; CCPA rights
          </h2>
          <p className="mt-2 text-gray-700">
            UK/EU residents may request access, correction, or deletion. Email
            Support@printalliance.net to exercise these rights.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-navy">Retention & security</h2>
          <p className="mt-2 text-gray-700">
            Data is encrypted in transit and at rest. We retain service
            documentation for seven years unless regulations require longer.
          </p>
        </section>
        <p className="text-sm text-gray-500">
          Updated November 14, 2025. Future updates will be posted on this page.
        </p>
      </div>
    </section>
  </>
);

export default PrivacyPage;

