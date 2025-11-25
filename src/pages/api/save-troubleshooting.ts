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
    const {
      brand,
      modelNumber,
      selectedProblem,
      selectedDevice,
      emailOptIn,
      email,
      callOptIn,
      userName,
      userEmail,
      userPhone,
      userAddress,
      country,
      sessionId,
    } = req.body;

    const { data, error } = await supabase
      .from("troubleshooting_requests")
      .insert({
        brand: brand || "unknown",
        model_number: modelNumber,
        problem: selectedProblem,
        device_type: selectedDevice,
        email_opt_in: emailOptIn || false,
        email: email,
        call_opt_in: callOptIn || false,
        user_name: userName,
        user_email: userEmail,
        user_phone: userPhone,
        user_address: userAddress,
        country: country,
        session_id: sessionId || null,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving troubleshooting request:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error("Exception saving troubleshooting request:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}

