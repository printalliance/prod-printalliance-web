# Email Notification Setup Guide

## Overview
All form submissions will automatically send email notifications to **support@printalliance.net** using Gmail SMTP.

## Environment Variables Required

Add these variables to your `.env.local` file:

```env
# Email Configuration (Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password

# Alternative variable names (also supported)
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
EMAIL_FROM=PrintAlliance <your-gmail@gmail.com>
```

## Gmail SMTP Settings

For Gmail, use these settings:
- **SMTP Host**: `smtp.gmail.com`
- **SMTP Port**: `465` (SSL) or `587` (TLS)
- **Security**: SSL/TLS
- **Username**: Your full Gmail address (e.g., `yourname@gmail.com`)
- **Password**: Your Gmail App Password (NOT your regular Gmail password)

### Important: Gmail App Password Required

Gmail requires an **App Password** for SMTP authentication, not your regular Gmail password. To generate an App Password:

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification** (must be enabled)
3. Scroll down to **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Enter "PrintAlliance" or any name you prefer
6. Click **Generate**
7. Copy the 16-character password and use it as `SMTP_PASS` or `EMAIL_PASSWORD`

## Forms That Send Email Notifications

1. **Contact Form** (`/api/contact`)
   - Sends notification with: Name, Email, Phone, Country, PrintAlliance, Issue Description, Contact Method

2. **Support Plan Request** (`/api/support-plan-request`)
   - Sends notification with: Plan Name, Plan Title, Customer Name, Email, Country, Issue Type

3. **Troubleshooting Request** (`/api/save-troubleshooting`)
   - Sends notification with: Brand, Model Number, Problem, Device Type, User Details

4. **Support Request** (`/api/save-support-request`)
   - Sends notification with: PrintAlliance

## Email Recipient

All emails are sent to: **support@printalliance.net**

## Testing

To test email functionality:

1. Fill out any form on the website
2. Submit the form
3. Check `support@printalliance.net` inbox
4. Check server logs for email sending status

## Troubleshooting

### Email Not Sending
1. Verify SMTP credentials in `.env.local`
2. Check that SMTP port 465 is not blocked by firewall
3. Verify you're using a Gmail App Password (not your regular password)
4. Ensure 2-Step Verification is enabled on your Google Account
5. Check server logs for error messages

### Common Issues
- **Authentication failed**: 
  - Make sure you're using a Gmail App Password, not your regular Gmail password
  - Verify 2-Step Verification is enabled on your Google Account
  - Check that the App Password was copied correctly (16 characters, no spaces)
- **Connection timeout**: Verify SMTP host (`smtp.gmail.com`) and port
- **Port blocked**: Try port 587 with TLS instead of 465 with SSL
- **"Less secure app" error**: Gmail no longer supports "less secure apps". You must use an App Password.

## Security Notes

- Never commit `.env.local` to version control
- Use strong passwords for email accounts
- Consider using app-specific passwords if available
- Keep email credentials secure

