import type { NextApiRequest, NextApiResponse } from "next";
import { contactSchema } from "@/utils/validation";
import { supabase } from "@/lib/supabase";
import { sendContactFormEmail } from "@/lib/email";
import { getClientIp } from "@/utils/getClientIp";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const payload = contactSchema.parse(req.body);

    // Save to Supabase
    const { data, error } = await supabase
      .from("contact_requests")
      .insert({
        full_name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        country: payload.country,
        printer_brand: payload.printerBrand,
        preferred_time: payload.preferredTime,
        issue_description: payload.issueDescription,
        contact_method: payload.contactMethod,
        newsletter: payload.newsletter || false,
        gdpr: payload.gdpr || false,
        status: "new",
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving contact request:", error);
      return res.status(500).json({ success: false, error: error.message });
    }

    console.info("New contact submission saved to Supabase", data);

    // Get client IP address
    const clientIp = getClientIp(req);

    // Send email notification
    try {
      await sendContactFormEmail({
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        country: payload.country,
        printerBrand: payload.printerBrand,
        preferredTime: payload.preferredTime,
        issueDescription: payload.issueDescription,
        contactMethod: payload.contactMethod,
        ipAddress: clientIp,
      });
    } catch (emailError) {
      console.error("Error sending email notification:", emailError);
      // Don't fail the request if email fails
    }

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error("Error processing contact form:", error);
    return res.status(400).json({ success: false, error: error.message || "Invalid submission" });
  }
}

