import { useState } from "react";
import Modal from "@/components/common/Modal";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import axios from "axios";

interface SupportPlanModalProps {
  open: boolean;
  onClose: () => void;
  planName: string;
  planTitle: string;
}

const issueTypes = [
  { label: "Printer Offline", value: "printer_offline" },
  { label: "New Printer Setup", value: "new_setup" },
  { label: "Printer Won't Print", value: "wont_print" },
  { label: "Slow Computer Performance", value: "slow_computer" },
  { label: "OS Updates", value: "os_updates" },
  { label: "Software Issues", value: "software_issues" },
  { label: "Network Connectivity", value: "network" },
  { label: "Other", value: "other" },
];

const countries = [
  { label: "United States", value: "USA" },
  { label: "United Kingdom", value: "UK" },
  { label: "Canada", value: "Canada" },
  { label: "Australia", value: "Australia" },
  { label: "Other", value: "Other" },
];

const SupportPlanModal = ({
  open,
  onClose,
  planName,
  planTitle,
}: SupportPlanModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "USA",
    issueType: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      setErrorMessage("Name is required");
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    if (!formData.country) {
      setErrorMessage("Country is required");
      return;
    }
    if (!formData.issueType) {
      setErrorMessage("Issue Type is required");
      return;
    }

    try {
      setStatus("loading");
      setErrorMessage("");

      await axios.post("/api/support-plan-request", {
        planName,
        planTitle,
        name: formData.name.trim(),
        email: formData.email.trim(),
        country: formData.country,
        issueType: formData.issueType,
      });

      setStatus("success");
      // Reset form
      setFormData({
        name: "",
        email: "",
        country: "USA",
        issueType: "",
      });

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setStatus("idle");
      }, 2000);
    } catch (error: any) {
      console.error("Error submitting support plan request:", error);
      setStatus("error");
      setErrorMessage(
        error.response?.data?.error || "Failed to submit. Please try again."
      );
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Get Started with Your Plan">
      {status === "success" ? (
        <div className="py-4 text-center">
          <div className="mb-4 text-4xl">✓</div>
          <h3 className="mb-2 text-xl font-semibold text-navy">
            Thank You!
          </h3>
          <p className="text-gray-600">
            Your request has been submitted successfully. We'll contact you
            shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4 rounded-lg bg-gray-50 p-3">
            <p className="text-sm font-semibold text-gray-600">Your Plan:</p>
            <p className="text-lg font-bold text-navy">{planTitle}</p>
          </div>

          <Input
            id="name"
            name="name"
            label="Name *"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            id="email"
            name="email"
            label="Email *"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            id="country"
            name="country"
            label="Country *"
            as="select"
            options={countries}
            value={formData.country}
            onChange={handleChange}
            required
          />

          <Input
            id="issueType"
            name="issueType"
            label="Issue Type *"
            as="select"
            options={issueTypes}
            value={formData.issueType}
            onChange={handleChange}
            required
          />

          {errorMessage && (
            <div className="rounded-lg bg-red/10 p-3 text-sm text-red">
              {errorMessage}
            </div>
          )}

          {status === "error" && !errorMessage && (
            <div className="rounded-lg bg-red/10 p-3 text-sm text-red">
              An error occurred. Please try again.
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
              disabled={status === "loading"}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default SupportPlanModal;


