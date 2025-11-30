import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

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

    const { data, error } = await supabase
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
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error("Exception saving support plan request:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
}

