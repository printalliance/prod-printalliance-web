import Head from "next/head";
import { siteUrl } from "@/utils/seo";

const ServiceAreasPage = () => (
  <>
    <Head>
      <title>USA & UK Service Areas | PrintAlliance</title>
      <meta
        name="description"
        content="PrintAlliance supports major USA and UK metros with on-site technicians plus remote coverage worldwide."
      />
      <link rel="canonical" href={`${siteUrl}/service-areas`} />
    </Head>
    <section className="section-padding">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <p className="highlight-bar justify-center">Coverage</p>
        <h1 className="mt-4 text-4xl font-bold text-navy">
          Service areas across the USA & UK
        </h1>
        <p className="mt-3 text-gray-600">
          Remote support is available globally. On-site dispatch available across all regions with fast response times.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-5xl gap-6 px-4 md:grid-cols-2">
        <div className="surface p-6">
          <h2 className="text-2xl font-semibold text-navy">United States</h2>
          <p className="mt-4 text-gray-700">
            We provide comprehensive printer support services across all states in the United States. Our network of certified technicians ensures fast response times and reliable service nationwide.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Coverage available throughout all US states and territories.
          </p>
        </div>
        <div className="surface p-6">
          <h2 className="text-2xl font-semibold text-navy">United Kingdom</h2>
          <p className="mt-4 text-gray-700">
            Our expert team delivers printer support services across all regions of the United Kingdom. From major cities to rural areas, we ensure consistent and professional service.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Coverage available throughout England, Scotland, Wales, and Northern Ireland.
          </p>
        </div>
      </div>
    </section>
  </>
);

export default ServiceAreasPage;

