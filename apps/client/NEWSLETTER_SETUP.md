# Newsletter Setup Guide

## Overview
This guide will help you set up the newsletter subscription feature that:
- Sends email notifications to your Gmail
- Logs subscribers to a Google Sheet

## Step 1: Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Enable **2-Step Verification** if not already enabled
4. After enabling 2FA, go back to Security
5. Click on **App passwords** (appears only after 2FA is enabled)
6. Select **Mail** and **Other (Custom name)**
7. Name it "MindShift Newsletter"
8. Click **Generate**
9. Copy the 16-character password (no spaces)

## Step 2: Google Sheets Setup

### 2.1 Create a Google Sheet
1. Go to https://sheets.google.com/
2. Create a new spreadsheet named "MindShift Newsletter Subscribers"
3. In Sheet1, add headers in row 1:
   - A1: `Date`
   - B1: `Email`
   - C1: `Name`
4. Copy the Sheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
   - Example: If URL is `https://docs.google.com/spreadsheets/d/1abc123def456/edit`
   - Your SHEET_ID is: `1abc123def456`

### 2.2 Create a Service Account

1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Create a new project or select existing one
3. Enable Google Sheets API:
   - Go to **APIs & Services** > **Library**
   - Search for "Google Sheets API"
   - Click **Enable**
4. Create Service Account:
   - Go to **APIs & Services** > **Credentials**
   - Click **Create Credentials** > **Service Account**
   - Name: "newsletter-service"
   - Click **Create and Continue**
   - Skip optional steps, click **Done**
5. Generate Key:
   - Click on the service account you just created
   - Go to **Keys** tab
   - Click **Add Key** > **Create new key**
   - Choose **JSON** format
   - Click **Create** (a JSON file will download)

### 2.3 Share Google Sheet with Service Account

1. Open the JSON file you downloaded
2. Find the `client_email` field (looks like: `newsletter-service@project-name.iam.gserviceaccount.com`)
3. Open your Google Sheet
4. Click **Share** button
5. Paste the service account email
6. Give it **Editor** access
7. Click **Send** (uncheck "Notify people")

## Step 3: Environment Variables

1. Create a `.env.local` file in `apps/client/` directory
2. Add these variables:

```env
# Newsletter Integration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password-from-step1
GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account-email-from-json-file
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-From-JSON\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-sheet-id-from-url
```

### How to get values:
- **GMAIL_USER**: Your Gmail address
- **GMAIL_APP_PASSWORD**: From Step 1
- **GOOGLE_SERVICE_ACCOUNT_EMAIL**: `client_email` from downloaded JSON
- **GOOGLE_PRIVATE_KEY**: `private_key` from downloaded JSON (keep all the \n characters)
- **GOOGLE_SHEET_ID**: From Step 2.1

## Step 4: Usage

### Add to any page:

```tsx
import NewsletterSignup from '@/components/NewsletterSignup';

// For English pages
<NewsletterSignup />

// For Arabic pages
<NewsletterSignup isArabic={true} />
```

### Example implementation:

```tsx
export default function ContactPage() {
  return (
    <div>
      <h1>Stay Updated</h1>
      <p>Subscribe to receive leadership insights and updates.</p>
      <NewsletterSignup />
    </div>
  );
}
```

## Testing

1. Start your dev server: `npm run dev`
2. Navigate to the page with the newsletter form
3. Enter an email and submit
4. Check:
   - Your Gmail inbox for notification
   - Google Sheet for new entry

## Troubleshooting

### Error: "Invalid login"
- Check GMAIL_APP_PASSWORD is correct (16 characters, no spaces)
- Verify 2-Step Verification is enabled on your Google Account

### Error: "Google Sheets API has not been used"
- Enable Google Sheets API in Google Cloud Console
- Wait 1-2 minutes for API activation

### Error: "Insufficient Permission"
- Make sure you shared the Google Sheet with the service account email
- Give Editor access to the service account

### Emails not appearing in sheet
- Verify GOOGLE_SHEET_ID is correct
- Check service account has Editor access to the sheet
- Verify range is correct (Sheet1!A:C)

## Security Notes

- Never commit `.env.local` to git
- Keep service account JSON file secure
- Rotate app passwords periodically
- Use environment variables in production (Vercel, etc.)
