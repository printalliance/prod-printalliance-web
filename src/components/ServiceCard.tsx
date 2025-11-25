import Button from "./common/Button";

export type Service = {
  title: string;
  description: string;
  slug: string;
  category: "setup" | "troubleshooting" | "network" | "maintenance" | "emergency";
};

const ServiceCard = ({ service }: { service: Service }) => (
  <div className="card flex flex-col gap-4 border border-gray-100">
    <h3 className="text-xl font-semibold text-navy">{service.title}</h3>
    <p className="text-gray-600">{service.description}</p>
    <Button
      variant="secondary"
      className="mt-auto"
      href={`/services/${service.slug}`}
    >
      Get Help Now
    </Button>
  </div>
);

export default ServiceCard;

