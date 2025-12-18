import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";
import { sendSupportPlanEmail } from "@/lib/email";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { planName, planTitle, name, email, country, issueType } = req.body;

    // Validation
    if (!planName || !planTitle) {
      return res.status(400).json({ error: "Plan information is required" });
    }
    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    if (!country) {
      return res.status(400).json({ error: "Country is required" });
    }
    if (!issueType) {
      return res.status(400).json({ error: "Issue Type is required" });
    }

    // Try to save the request in Supabase, but don't fail the whole request
    // if Supabase is temporarily unreachable (e.g. "fetch failed").
    let data = null;
    try {
      const { data: dbData, error } = await supabase
        .from("support_plan_requests")
        .insert({
          plan_name: planName,
          plan_title: planTitle,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          country: country,
          issue_type: issueType,
          status: "pending",
        })
        .select()
        .single();

      if (error) {
        console.error("Error saving support plan request:", error);
      } else {
        data = dbData;
      }
    } catch (dbError: any) {
      console.error("Supabase request failed while saving support plan request:", dbError);
      // Continue anyway – we'll still send the email and return success
    }

    // Send email notification
    try {
      await sendSupportPlanEmail({
        planName,
        planTitle,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        country,
        issueType,
      });
    } catch (emailError: any) {
      console.error("Error sending email notification:", emailError.message);
      // Don't fail the request if email fails
    }

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error("Exception saving support plan request:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
}


