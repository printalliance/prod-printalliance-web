import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { sendTroubleshootingEmail } from "@/lib/email";
import { getClientIp } from "@/utils/getClientIp";

// Use service role key for server-side API operations to bypass RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://flfjzyxibzfuqcfyexfx.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsZmp6eXhpYnpmdXFjZnlleGZ4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mzk5NDU5MiwiZXhwIjoyMDc5NTcwNTkyfQ.sp89VOMZCGQNYDirHnz8_VMxpz_ZusBkQtP6CsdQgggs';

// Create admin client with service role key for server-side operations
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

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

    // Validate required fields
    if (!userName || !userEmail || !userPhone || !country) {
      return res.status(400).json({ 
        error: "Missing required fields: name, email, phone, and country are required" 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    console.log("Saving troubleshooting request:", {
      brand: brand || "unknown",
      userName,
      userEmail,
      userPhone,
      country,
    });

    // Try to save the request in Supabase, but don't fail the whole request
    // if Supabase is temporarily unreachable (e.g. "fetch failed").
    let data = null;
    try {
      const { data: dbData, error } = await supabase
        .from("troubleshooting_requests")
        .insert({
          brand: brand || "unknown",
          model_number: modelNumber || null,
          problem: selectedProblem || null,
          device_type: selectedDevice || null,
          email_opt_in: emailOptIn || false,
          email: email || null,
          call_opt_in: callOptIn || false,
          user_name: userName,
          user_email: userEmail,
          user_phone: userPhone,
          user_address: userAddress || null,
          country: country,
          session_id: sessionId || null,
          status: "pending",
        })
        .select()
        .single();

      if (error) {
        console.error("Error saving troubleshooting request:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
      } else {
        data = dbData;
        console.log("Troubleshooting request saved successfully:", data);
      }
    } catch (dbError: any) {
      console.error("Supabase request failed while saving troubleshooting request:", dbError);
      // Continue anyway – we'll still send the email and return success
    }

    // Get client IP address
    const clientIp = getClientIp(req);

    // Send email notification (always try to send email even if DB insert failed)
    try {
      const emailResult = await sendTroubleshootingEmail({
        brand: brand || "unknown",
        modelNumber,
        problem: selectedProblem,
        deviceType: selectedDevice,
        userName,
        userEmail,
        userPhone,
        userAddress,
        country,
        ipAddress: clientIp,
      });
      
      if (emailResult && emailResult.success) {
        console.log("Troubleshooting email sent successfully:", emailResult.messageId);
      } else {
        console.error("Email sending failed:", emailResult?.error || "Unknown error");
      }
    } catch (emailError: any) {
      console.error("Error sending email notification:", emailError?.message || emailError);
      // Don't fail the request if email fails, but log it for debugging
    }

    // Return success even if DB insert failed, as long as we tried to send email
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error("Exception saving troubleshooting request:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}

