import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ContactModal from "@/components/ContactModal";

const EngagementPrompt = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Reset state on route change
    setIsOpen(false);

    // Don't show on admin/support-only pages if needed
    if (router.pathname === "/adminsupport") {
      return;
    }

    // Listen for form submission events
    const handleFormSubmit = () => {
      setIsOpen(true);
    };

    window.addEventListener("formSubmitted", handleFormSubmit);

    return () => {
      window.removeEventListener("formSubmitted", handleFormSubmit);
    };
  }, [router.pathname]);

  return (
    <ContactModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
  );
};

export default EngagementPrompt;


