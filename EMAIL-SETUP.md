# Email Notification Setup Guide

## Overview
All form submissions will automatically send email notifications to **support@printalliance.net** using your Hostinger business email.

## Environment Variables Required

Add these variables to your `.env.local` file:

```env
# Email Configuration (Hostinger Business Email)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password

# Alternative variable names (also supported)
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASSWORD=your-email-password
EMAIL_FROM=PrintAlliance <your-email@yourdomain.com>
```

## Hostinger SMTP Settings

For Hostinger business email, use these settings:
- **SMTP Host**: `smtp.hostinger.com`
- **SMTP Port**: `465` (SSL) or `587` (TLS)
- **Security**: SSL/TLS
- **Username**: Your full email address (e.g., `support@printalliance.net`)
- **Password**: Your email account password

## Forms That Send Email Notifications

1. **Contact Form** (`/api/contact`)
   - Sends notification with: Name, Email, Phone, Country, Printer Brand, Issue Description, Contact Method

2. **Support Plan Request** (`/api/support-plan-request`)
   - Sends notification with: Plan Name, Plan Title, Customer Name, Email, Country, Issue Type

3. **Troubleshooting Request** (`/api/save-troubleshooting`)
   - Sends notification with: Brand, Model Number, Problem, Device Type, User Details

4. **Support Request** (`/api/save-support-request`)
   - Sends notification with: Printer Brand

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
3. Verify email account password is correct
4. Check server logs for error messages

### Common Issues
- **Authentication failed**: Check username and password
- **Connection timeout**: Verify SMTP host and port
- **Port blocked**: Try port 587 with TLS instead of 465 with SSL

## Security Notes

- Never commit `.env.local` to version control
- Use strong passwords for email accounts
- Consider using app-specific passwords if available
- Keep email credentials secure

