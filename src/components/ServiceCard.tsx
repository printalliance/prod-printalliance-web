import { useState } from "react";
import Button from "./common/Button";
import ContactModal from "./ContactModal";
import type { Service } from "@/utils/data";

const ServiceCard = ({ service }: { service: Service }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="card flex flex-col gap-4 border border-gray-100">
        <h3 className="text-xl font-semibold text-navy">{service.title}</h3>
        <p className="text-gray-600">{service.description}</p>
        <div className="mt-auto flex gap-2">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => setIsModalOpen(true)}
          >
            Get Help Now
          </Button>
          <Button
            variant="ghost"
            className="flex-1"
            href={`/services/${service.slug}`}
          >
            Learn More
          </Button>
        </div>
      </div>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ServiceCard;

