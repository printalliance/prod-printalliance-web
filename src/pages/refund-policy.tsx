import Head from "next/head";
import { siteUrl } from "@/utils/seo";

const RefundPolicyPage = () => (
  <>
    <Head>
      <title>Refund Policy | PrintAlliance</title>
      <meta
        name="description"
        content="Understand PrintAlliance's satisfaction guarantee, refund eligibility, and how to request a reimbursement for support services."
      />
      <link rel="canonical" href={`${siteUrl}/refund-policy`} />
    </Head>
    <section className="section-padding">
      <div className="mx-auto max-w-4xl space-y-6 px-4">
        <h1 className="text-4xl font-bold text-navy">Refund Policy</h1>
        <p className="text-gray-600">
          PrintAlliance is committed to transparent, results-driven service. This refund policy explains when you can request a reimbursement and
          the steps required to process it quickly.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-navy">Satisfaction promise</h2>
          <p className="mt-2 text-gray-700">
            If we are unable to resolve the issue outlined in your ticket, you are not charged. Completed sessions are also covered by a 30-day
            satisfaction period. If the resolution does not meet expectations, you will get full refund in 7 days.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-navy">Eligibility & timeline</h2>
          <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-700">
            <li>Requests must be submitted within 30 days of the original service date.</li>
            <li>Refunds are issued to the original payment method within seven business days of approval.</li>
            <li>Subscription or managed-service retainers are refunded on a pro-rated basis.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-navy">How to request a refund</h2>
          <ol className="mt-2 list-decimal space-y-2 pl-6 text-gray-700">
            <li>Email Support@printalliance.net or call +1-210-512-8406 with your ticket number or invoice ID.</li>
            <li>Describe the original issue, the steps already taken, and why the solution was unsatisfactory.</li>
            <li>Our billing team will acknowledge the request within one business day and confirm next steps.</li>
          </ol>
          <p className="mt-2 text-gray-600">
            You may be asked to provide remote access logs, screenshots, or additional diagnostics so we can verify the outcome.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-navy">Exclusions</h2>
          <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-700">
s            <li>Connectivity failures caused by client networks, ISP outages, or security appliances outside our control.</li>
            <li>Unsupported printer models or systems that deviate from manufacturer specifications.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-navy">Need help?</h2>
          <p className="mt-2 text-gray-700">
            Reach our billing desk at <a className="text-navy underline" href="mailto:Support@printalliance.net">Support@printalliance.net</a> or
            call <a className="text-navy underline" href="tel:+12105128406">+1-210-512-8406</a>. We respond 24/7 and make every effort to resolve
            refund reviews within three business days.
          </p>
        </section>
      </div>
    </section>
  </>
);

export default RefundPolicyPage;




