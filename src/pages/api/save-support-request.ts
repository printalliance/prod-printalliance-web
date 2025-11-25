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
    const { brand } = req.body;

    if (!brand) {
      return res.status(400).json({ error: "Brand is required" });
    }

    const { data, error } = await supabase
      .from("support_requests")
      .insert({
        brand: brand,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving support request:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error("Exception saving support request:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}

