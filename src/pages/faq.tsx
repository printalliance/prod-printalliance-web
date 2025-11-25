import Head from "next/head";
import { faqContent } from "@/utils/data";
import { buildFaqSchema } from "@/utils/schema";
import { buildSchemaScript, siteUrl } from "@/utils/seo";

const FAQPage = () => (
  <>
    <Head>
      <title>Printer Support FAQ | PrintAlliance</title>
      <meta
        name="description"
        content="Answers to common questions about printer troubleshooting, pricing, support coverage, and onboarding."
      />
      <link rel="canonical" href={`${siteUrl}/faq`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildSchemaScript(
            buildFaqSchema(
              faqContent.map((faq) => ({
                question: faq.question,
                answer: faq.answer,
              })),
            ),
          ),
        }}
      />
    </Head>
    <section className="section-padding">
      <div className="mx-auto max-w-4xl px-4">
        <p className="highlight-bar justify-center">FAQ</p>
        <h1 className="mt-4 text-4xl font-bold text-navy text-center">
          Frequently asked questions
        </h1>
        <div className="mt-8 space-y-4">
          {faqContent.map((faq) => (
            <details
              key={faq.question}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <summary className="cursor-pointer text-lg font-semibold text-navy">
                {faq.question}
              </summary>
              <p className="mt-3 text-gray-600">{faq.answer}</p>
              <p className="mt-2 text-xs uppercase tracking-wide text-gray-400">
                Category: {faq.category}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default FAQPage;

