# Simple Newsletter Setup (3 Steps Only!)

## What This Does
When someone subscribes, you'll receive an email with their info. That's it!

---

## Step 1: Get Gmail App Password (2 minutes)

1. Go to: https://myaccount.google.com/security
2. Scroll down and click **2-Step Verification**
3. Enable it if not already on
4. Go back to Security page
5. Click **App passwords** (near bottom)
6. Select:
   - App: **Mail**
   - Device: **Other** (type "MindShift")
7. Click **Generate**
8. Copy the 16-character password (looks like: `abcd efgh ijkl mnop`)

---

## Step 2: Add Environment Variables (1 minute)

1. Create file: `apps/client/.env.local`
2. Add these 2 lines:

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

Replace with:
- Your actual Gmail address
- The 16-character password from Step 1 (remove spaces)

---

## Step 3: Use the Component

Add to any page:

```tsx
import NewsletterSignup from '@/components/NewsletterSignup';

// English version
<NewsletterSignup />

// Arabic version
<NewsletterSignup isArabic={true} />
```

---

## Test It

1. Run: `npm run dev`
2. Fill out the form
3. Check your Gmail inbox!

---

## Troubleshooting

**Error: "Invalid login"**
- Make sure you created an App Password (not your regular Gmail password)
- Remove any spaces from the 16-character password
- Verify 2-Step Verification is enabled

**Not receiving emails?**
- Check spam folder
- Wait 30 seconds and try again
- Verify GMAIL_USER is correct

---

## Where Are Emails Stored?

They're sent to your Gmail inbox. You can:
- Create a Gmail label/filter to organize them
- Forward them to another email
- Manually copy to a spreadsheet later

That's it! Simple and working. 😊
