import Head from "next/head";
import { siteUrl } from "@/utils/seo";

const TermsPage = () => (
  <>
    <Head>
      <title>Terms of Service | PrintAlliance</title>
      <meta
        name="description"
        content="Review PrintAlliance terms covering service delivery, SLAs, acceptable use, and liabilities."
      />
      <link rel="canonical" href={`${siteUrl}/terms`} />
    </Head>
    <section className="section-padding">
      <div className="mx-auto max-w-4xl space-y-6 px-4">
        <h1 className="text-4xl font-bold text-navy">Terms of Service</h1>
        <p className="text-gray-600">
          Effective November 14, 2025. These terms govern use of PrintAlliance
          services for all USA and UK clients.
        </p>
        <div className="space-y-4 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-navy">1. Services</h2>
            <p>
              We provide printer setup, maintenance, troubleshooting, and
              emergency support per executed statements of work or subscriptions.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-navy">
              2. Service levels
            </h2>
            <p>
              SLAs apply only when fees are current and required site access is
              provided. Credits are limited to the monthly service fee.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-navy">
              3. Acceptable use
            </h2>
            <p>
              Clients must maintain secure environments, provide accurate issue
              details, and ensure printers comply with all applicable laws.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-navy">
              4. Liability & indemnity
            </h2>
            <p>
              PrintAlliance liability is capped at fees paid in the preceding
              three months. We are not liable for consequential damages.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-navy">
              5. Governing law
            </h2>
            <p>
              US engagements follow Delaware law; UK engagements follow English
              law. Disputes will be handled via binding arbitration.
            </p>
          </section>
        </div>
      </div>
    </section>
  </>
);

export default TermsPage;

