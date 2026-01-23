import Head from "next/head";
import { siteUrl } from "@/utils/seo";

const ServiceAreasPage = () => (
  <>
    <Head>
      <title>Service Coverage Areas | PrintAlliance</title>
      <meta
        name="description"
        content="PrintAlliance provides comprehensive support with remote coverage worldwide."
      />
      <link rel="canonical" href={`${siteUrl}/service-areas`} />
    </Head>
    <section className="section-padding">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <p className="highlight-bar justify-center">Coverage</p>
        <h1 className="mt-4 text-4xl font-bold text-navy">
          Global Service Coverage
        </h1>
        <p className="mt-3 text-gray-600">
          Remote support is available globally. Fast response times and comprehensive coverage worldwide.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-5xl gap-6 px-4 md:grid-cols-2">
        <div className="surface p-6">
          <h2 className="text-2xl font-semibold text-navy">Primary Service Region</h2>
          <p className="mt-4 text-gray-700">
            We provide comprehensive printer support services with remote coverage. Our network ensures fast response times and reliable service delivery.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Coverage available in multiple regions with flexible service options.
          </p>
        </div>
        <div className="surface p-6">
          <h2 className="text-2xl font-semibold text-navy">Extended Coverage</h2>
          <p className="mt-4 text-gray-700">
            Our expert team delivers comprehensive printer support services with flexible deployment options. We provide consistent and professional service wherever you need it.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Remote support available based on your requirements.
          </p>
        </div>
      </div>
    </section>
  </>
);

export default ServiceAreasPage;

