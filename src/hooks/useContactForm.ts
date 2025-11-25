import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import {
  ContactFormValues,
  contactSchema,
} from "@/utils/validation";

export const useContactForm = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      country: "USA",
      contactMethod: "phone",
      newsletter: false,
      gdpr: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setStatus("loading");
      await axios.post("/api/contact", data);
      setStatus("success");
      form.reset({
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

  return { form, onSubmit, status };
};

