import Button from "@/components/common/Button";

const CTA = () => (
  <section className="section-padding bg-navy text-white">
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
      <h2 className="text-3xl font-bold md:text-4xl">
        Ready to get your printers back online?
      </h2>
      <p className="text-lg text-gray-200">
        Certified engineers are on standby 24/7 for USA and UK offices.
        Average response time: 38 minutes.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button href="tel:+12105128406">Call Now</Button>
        <Button
          variant="secondary"
          href="/pricing"
          className="border-white text-white hover:bg-white hover:text-navy"
        >
          View Pricing
        </Button>
      </div>
    </div>
  </section>
);

export default CTA;

