import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { getClientIp } from "@/utils/getClientIp";
import nodemailer from "nodemailer";

const RECIPIENT_EMAIL = "support@printalliance.net";

const createTransporter = () => {
  const port = parseInt(process.env.SMTP_PORT || "587");
  
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER || process.env.EMAIL_USER,
      pass: process.env.SMTP_PASS || process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, phone, brand, issue } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !brand || !issue) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert({
        name,
        email,
        phone,
        brand,
        issue,
        status: "new",
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving contact submission:", error);
      return res.status(500).json({ success: false, error: error.message });
    }

    console.info("New contact submission saved to Supabase", data);

    // Get client IP address
    const clientIp = getClientIp(req);

    // Send email notification to support team
    try {
      const adminEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #E63946; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #082F49; }
            .value { margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              <div class="field">
                <div class="label">PrintAlliance:</div>
                <div class="value">${brand}</div>
              </div>
              <div class="field">
                <div class="label">Issue:</div>
                <div class="value">${issue}</div>
              </div>
              ${clientIp ? `
              <div class="field">
                <div class="label">IP Address:</div>
                <div class="value">${clientIp}</div>
              </div>
              ` : ""}
            </div>
          </div>
        </body>
        </html>
      `;

      await sendEmail({
        subject: `New Contact Form Submission - ${name}`,
        html: adminEmailHtml,
      });
    } catch (emailError) {
      console.error("Error sending admin email notification:", emailError);
    }

    // Send confirmation email to user
    try {
      const userEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #E63946; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Thank You for Contacting PrintAlliance</h2>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>We have received your printer support query and appreciate you reaching out to us.</p>
              <p><strong>Your Query Details:</strong></p>
              <ul>
                <li><strong>PrintAlliance:</strong> ${brand}</li>
                <li><strong>Issue:</strong> ${issue}</li>
              </ul>
              <p>Our support team will review your submission and get back to you within 1 hour at the contact information you provided.</p>
              <p>If you have any urgent issues, you can also reach us at:</p>
              <p>
                <strong>📧 Email:</strong> <a href="mailto:Support@printalliance.net">Support@printalliance.net</a><br>
                <strong>📞 Phone:</strong> <a href="tel:+13252195205">+1-325-219-5205</a>
              </p>
              <p>Thank you for choosing PrintAlliance!</p>
              <p>Best regards,<br>The PrintAlliance Team</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} PrintAlliance. All rights reserved.</p>
              <p>This is an automated response. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      const transporter = createTransporter();
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.SMTP_USER || process.env.EMAIL_USER || "noreply@printalliance.net",
        to: email,
        subject: "Thank You for Contacting PrintAlliance",
        html: userEmailHtml,
      });

      console.info("Confirmation email sent to user:", email);
    } catch (emailError) {
      console.error("Error sending user confirmation email:", emailError);
      // Don't fail the request if email fails
    }

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error("Error processing contact form:", error);
    return res.status(400).json({ success: false, error: error.message || "Invalid submission" });
  }
}

