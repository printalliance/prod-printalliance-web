import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import CTA from "@/components/CTA";
import { servicesList, serviceDetails } from "@/utils/data";
import { buildServiceSchema } from "@/utils/schema";
import { buildSchemaScript, siteUrl } from "@/utils/seo";

type ServiceListItem = (typeof servicesList)[number];
type ServiceDetail = (typeof serviceDetails)[keyof typeof serviceDetails];

type ServicePageProps = {
  service: ServiceListItem;
  details: ServiceDetail;
};

const ServiceDetailPage = ({ service, details }: ServicePageProps) => (
  <>
    <Head>
      <title>{`${service.title} | PrintAlliance`}</title>
      <meta name="description" content={details.hero} />
      <link
        rel="canonical"
        href={`${siteUrl}/services/${service.slug}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildSchemaScript(
            buildServiceSchema({
              name: service.title,
              description: details.hero,
              url: `https://www.printalliance.com/services/${service.slug}`,
            }),
          ),
        }}
      />
    </Head>
    <section className="section-padding">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <p className="highlight-bar">{service.category} services</p>
        <h1 className="mt-4 text-4xl font-bold text-navy">{service.title}</h1>
        <p className="mt-4 text-lg text-gray-700">{details.hero}</p>
      </div>
      <div className="mx-auto mt-10 max-w-6xl grid gap-8 px-4 lg:px-8 lg:grid-cols-3">
        <div className="surface p-8 lg:col-span-2">
          <h2 className="text-2xl font-semibold text-navy">
            How we deliver results
          </h2>
          <ul className="mt-4 space-y-3 text-gray-600">
            {details.steps.map((step) => (
              <li key={step}>• {step}</li>
            ))}
          </ul>
          <h3 className="mt-8 text-xl font-semibold text-navy">Key benefits</h3>
          <ul className="mt-3 grid gap-4 md:grid-cols-2">
            {details.benefits.map((benefit) => (
              <li key={benefit} className="rounded-2xl bg-gray-light p-4">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <aside className="surface p-6">
          <h3 className="text-xl font-semibold text-navy">Pricing snapshots</h3>
          <ul className="mt-4 space-y-3 text-gray-600">
            {details.pricing.map((price) => (
              <li key={price}>• {price}</li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl bg-gray-light p-4 text-sm text-gray-600">
            Tailored pricing available for enterprise fleets and multi-site rollouts.
          </div>
        </aside>
      </div>
      <div className="mx-auto mt-12 max-w-6xl px-4 lg:px-8">
        <h3 className="text-2xl font-semibold text-navy">Service FAQ</h3>
        <div className="mt-6 space-y-4">
          {details.faq.map((item) => (
            <details
              key={item.question}
              className="rounded-2xl border border-gray-200 bg-white p-4"
            >
              <summary className="cursor-pointer text-lg font-semibold text-navy">
                {item.question}
              </summary>
              <p className="mt-3 text-gray-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
    <CTA />
  </>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = servicesList.map((service) => ({
    params: { category: service.slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ServicePageProps> = async ({
  params,
}) => {
  const slug = params?.category as string;
  const service = servicesList.find((item) => item.slug === slug);
  const details =
    service && (serviceDetails as Record<string, ServiceDetail>)[slug];

  if (!service || !details) {
    return { notFound: true };
  }

  return {
    props: {
      service,
      details,
    },
  };
};

export default ServiceDetailPage;

