import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { contactSchema } from "@/utils/validation";
import type { ContactFormValues } from "@/utils/validation";

const printerOptions = [
  { label: "HP", value: "hp" },
  { label: "Canon", value: "canon" },
  { label: "Brother", value: "brother" },
  { label: "Epson", value: "epson" },
  { label: "Ricoh", value: "ricoh" },
  { label: "Other", value: "other" },
];

const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      country: "USA" as const,
      contactMethod: "phone" as const,
      newsletter: false,
      gdpr: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setStatus("loading");
      await axios.post("/api/contact", data);
      setStatus("success");
      reset({
        country: "USA",
        contactMethod: "phone",
        newsletter: false,
        gdpr: false,
      } as Partial<ContactFormValues>);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          id="fullName"
          label="Full Name"
          placeholder="Alex Morgan"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="support@company.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          id="phone"
          label="Phone Number"
          type="tel"
          placeholder="+1-210-512-8406"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Country
              </label>
              <div className="space-y-2">
                {[
                { label: "USA", value: "USA" },
                { label: "United Kingdom", value: "UK" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      field.value === option.value
                        ? "border-navy bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="country"
                      value={option.value}
                      checked={field.value === option.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="w-5 h-5 text-navy"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.country && (
                <p className="mt-1 text-sm text-red">{errors.country.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          name="printerBrand"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Printer Brand (optional)
              </label>
              <div className="space-y-2">
                {printerOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      field.value === option.value
                        ? "border-navy bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="printerBrand"
                      value={option.value}
                      checked={field.value === option.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="w-5 h-5 text-navy"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        />
        <Input
          id="preferredTime"
          label="Preferred Time (optional)"
          type="time"
          {...register("preferredTime")}
        />
      </div>

      <Input
        id="issueDescription"
        label="Issue Description"
        as="textarea"
        placeholder="Share what went wrong, error messages, recent changes..."
        error={errors.issueDescription?.message}
        {...register("issueDescription")}
      />

      <div>
        <p className="text-sm font-semibold text-navy">
          Preferred Contact Method
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {[
            { label: "Phone", value: "phone" },
            { label: "Email", value: "email" },
            { label: "Live Chat", value: "chat" },
          ].map((method) => (
            <label
              key={method.value}
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700"
            >
              <input
                type="radio"
                value={method.value}
                className="text-red focus:ring-red"
                {...register("contactMethod")}
              />
              {method.label}
            </label>
          ))}
        </div>
        {errors.contactMethod && (
          <p className="mt-1 text-sm text-red">
            {errors.contactMethod.message}
          </p>
        )}
      </div>

      <div className="space-y-3 rounded-2xl border border-gray-200 bg-gray-light p-4">
        <label className="flex items-start gap-3 text-sm text-gray-700">
          <input
            type="checkbox"
            className="mt-1 text-red focus:ring-red"
            {...register("newsletter")}
          />
          Subscribe to productivity tips and maintenance checklists
        </label>
        <label className="flex items-start gap-3 text-sm font-semibold text-gray-800">
          <input
            type="checkbox"
            className="mt-1 text-red focus:ring-red"
            {...register("gdpr")}
          />
          I agree to the PrintAlliance privacy policy (GDPR compliant)
        </label>
        {errors.gdpr && <p className="text-sm text-red">{errors.gdpr.message}</p>}
      </div>

      <div className="rounded-2xl border border-dashed border-navy/40 bg-white p-4 text-sm text-gray-600">
        Protected by reCAPTCHA v3. We automatically screen spam before it hits
        our help desk.
      </div>

      <Button type="submit" fullWidth disabled={status === "loading"}>
        {status === "loading" ? "Submitting..." : "Request Support"}
      </Button>

      {status === "success" && (
        <p className="text-center text-sm font-semibold text-green-700">
          Thank you! We&apos;ll contact you within 1 hour.
        </p>
      )}
      {status === "error" && (
        <p className="text-center text-sm font-semibold text-red">
          Something went wrong. Please try again or call us at +1-210-512-8406.
        </p>
      )}
    </form>
  );
};

export default ContactForm;

