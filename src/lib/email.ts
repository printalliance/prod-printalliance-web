const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdkqzonz";

interface EmailOptions {
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async ({ subject, html, text }: EmailOptions) => {
  try {
    // Forward all form submissions to Formspree.
    // The Formspree dashboard is configured to deliver to support@printalliance.net.
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: subject,
        subject,
        message_html: html,
        message_text: text || subject,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Formspree error:", response.status, errorText);
      throw new Error(`Formspree responded with ${response.status}`);
    }

    console.log("Form submission forwarded to Formspree successfully");
    return { success: true };
  } catch (error: any) {
    console.error("Error sending email via Formspree:", error);
    return { success: false, error: error.message };
  }
};

export const sendContactFormEmail = async (data: {
  fullName: string;
  email: string;
  phone?: string;
  country: string;
  printerBrand?: string;
  preferredTime?: string;
  issueDescription?: string;
  contactMethod: string;
}) => {
  const subject = `New Contact Form Submission - ${data.fullName}`;
  const html = `
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
            <div class="value">${data.fullName}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          ${data.phone ? `
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
          </div>
          ` : ""}
          <div class="field">
            <div class="label">Country:</div>
            <div class="value">${data.country}</div>
          </div>
          ${data.printerBrand ? `
          <div class="field">
            <div class="label">Printer Brand:</div>
            <div class="value">${data.printerBrand}</div>
          </div>
          ` : ""}
          <div class="field">
            <div class="label">Preferred Contact Method:</div>
            <div class="value">${data.contactMethod}</div>
          </div>
          ${data.preferredTime ? `
          <div class="field">
            <div class="label">Preferred Time:</div>
            <div class="value">${data.preferredTime}</div>
          </div>
          ` : ""}
          ${data.issueDescription ? `
          <div class="field">
            <div class="label">Issue Description:</div>
            <div class="value">${data.issueDescription}</div>
          </div>
          ` : ""}
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ subject, html });
};

export const sendSupportPlanEmail = async (data: {
  planName: string;
  planTitle: string;
  name: string;
  email: string;
  country: string;
  issueType: string;
}) => {
  const subject = `New Support Plan Request - ${data.planTitle}`;
  const html = `
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
        .plan-badge { background-color: #082F49; color: white; padding: 10px; border-radius: 5px; display: inline-block; margin-bottom: 15px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Support Plan Request</h2>
        </div>
        <div class="content">
          <div class="plan-badge">${data.planTitle}</div>
          <div class="field">
            <div class="label">Plan:</div>
            <div class="value">${data.planName}</div>
          </div>
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          <div class="field">
            <div class="label">Country:</div>
            <div class="value">${data.country}</div>
          </div>
          <div class="field">
            <div class="label">Issue Type:</div>
            <div class="value">${data.issueType}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ subject, html });
};

export const sendTroubleshootingEmail = async (data: {
  brand: string;
  modelNumber?: string;
  problem?: string;
  deviceType?: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  userAddress?: string;
  country?: string;
}) => {
  const subject = `New Troubleshooting Request - ${data.brand.toUpperCase()}`;
  const html = `
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
          <h2>New Troubleshooting Request</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Printer Brand:</div>
            <div class="value">${data.brand.toUpperCase()}</div>
          </div>
          ${data.modelNumber ? `
          <div class="field">
            <div class="label">Model Number:</div>
            <div class="value">${data.modelNumber}</div>
          </div>
          ` : ""}
          ${data.problem ? `
          <div class="field">
            <div class="label">Problem:</div>
            <div class="value">${data.problem}</div>
          </div>
          ` : ""}
          ${data.deviceType ? `
          <div class="field">
            <div class="label">Device Type:</div>
            <div class="value">${data.deviceType}</div>
          </div>
          ` : ""}
          ${data.userName ? `
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${data.userName}</div>
          </div>
          ` : ""}
          ${data.userEmail ? `
          <div class="field">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${data.userEmail}">${data.userEmail}</a></div>
          </div>
          ` : ""}
          ${data.userPhone ? `
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value"><a href="tel:${data.userPhone}">${data.userPhone}</a></div>
          </div>
          ` : ""}
          ${data.country ? `
          <div class="field">
            <div class="label">Country:</div>
            <div class="value">${data.country}</div>
          </div>
          ` : ""}
          ${data.userAddress ? `
          <div class="field">
            <div class="label">Address:</div>
            <div class="value">${data.userAddress}</div>
          </div>
          ` : ""}
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ subject, html });
};

export const sendSupportRequestEmail = async (data: {
  brand: string;
}) => {
  const subject = `New Support Request - ${data.brand.toUpperCase()}`;
  const html = `
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
          <h2>New Support Request</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Printer Brand:</div>
            <div class="value">${data.brand.toUpperCase()}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ subject, html });
};

