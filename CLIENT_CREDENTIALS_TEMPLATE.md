# Client Credentials & Access Information

## 🔐 Account Credentials

### Gmail Account
```
Email: _________________________________
Password: _________________________________
Recovery Email: _________________________________
Recovery Phone: _________________________________
```

### GitHub Account
```
Username: _________________________________
Email: (same as Gmail above)
Password: _________________________________
2FA Enabled: [ ] Yes  [ ] No
2FA Recovery Codes: (store securely)
```

### Vercel Account
```
Login Method: Sign in with GitHub
Account Email: (same as Gmail above)
No separate password needed - uses GitHub authentication
```

---

## 🌐 Website & Services URLs

### Production Website
```
Main URL: https://_________________________________
Keystatic CMS: https://_________________________________/keystatic
```

### English Pages
```
Homepage: https://_________________________________
Blog: https://_________________________________/blog
About Coach: https://_________________________________/coach
Programs: https://_________________________________/programs
Contact: https://_________________________________/contact
```

### Arabic Pages
```
Homepage: https://_________________________________/ar
Blog: https://_________________________________/ar/blog
About Coach: https://_________________________________/ar/coach
Programs: https://_________________________________/ar/programs
Contact: https://_________________________________/ar/contact
```

---

## 🛠️ Admin & Management

### GitHub Repository
```
Repository URL: https://github.com/_________________________________
Repository Name: _________________________________
Branch: main
Visibility: [ ] Public  [ ] Private
```

### Vercel Dashboard
```
Dashboard: https://vercel.com/
Project Name: _________________________________
Team/Account: _________________________________
```

### Keystatic CMS
```
Access URL: https://_________________________________/keystatic
Login Method: Sign in with GitHub (client's account)
```

---

## 🔑 Environment Variables (Stored in Vercel)

**IMPORTANT**: These are already configured in Vercel. Only for reference/backup.

```
KEYSTATIC_GITHUB_CLIENT_ID: [Set in Vercel]
KEYSTATIC_GITHUB_CLIENT_SECRET: [Set in Vercel]
KEYSTATIC_SECRET: [Set in Vercel]
NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG: [Set in Vercel]

DATABASE_URL: [Set in Vercel - if using]
JWT_SECRET: [Set in Vercel]
```

---

## 📱 GitHub App (Keystatic)

```
App Name: _________________________________
App ID: _________________________________
Installation ID: _________________________________

Settings URL: https://github.com/settings/apps/[app-name]

Callback URL: https://_________________________________/api/keystatic/github/oauth/callback
```

---

## 📞 Support & Documentation

### Documentation Files in Repository
- `DEPLOYMENT_HANDOFF_GUIDE.md` - Complete deployment guide
- `HOW_TO_USE_KEYSTATIC.md` - CMS usage instructions
- `KEYSTATIC_TROUBLESHOOTING.md` - Common issues & solutions
- `QUICK_HANDOFF_CHECKLIST.md` - Quick reference

### Important Links
- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Keystatic Documentation: https://keystatic.com/docs
- GitHub Documentation: https://docs.github.com

---

## ✅ Access Verification Checklist

Verify client can access all of the following:

**GitHub:**
- [ ] Log into GitHub account
- [ ] View repository
- [ ] See commit history
- [ ] View GitHub App in settings

**Vercel:**
- [ ] Log into Vercel (via GitHub)
- [ ] View project dashboard
- [ ] See deployments
- [ ] View environment variables
- [ ] Trigger manual deployment

**Website:**
- [ ] Access main website
- [ ] Navigate all English pages
- [ ] Navigate all Arabic pages
- [ ] View all blog articles

**Keystatic CMS:**
- [ ] Access Keystatic dashboard
- [ ] Sign in with GitHub
- [ ] View all articles
- [ ] Edit an article
- [ ] Create new article
- [ ] See changes appear on site (2-3 min)

---

## 🔒 Security Recommendations

### Immediate Actions
- [ ] Enable 2FA on GitHub account
- [ ] Save 2FA recovery codes securely
- [ ] Change passwords from temporary ones (if provided)
- [ ] Review GitHub repository permissions
- [ ] Review Vercel project access

### Best Practices
- [ ] Use strong, unique passwords
- [ ] Don't share credentials
- [ ] Don't commit sensitive data to GitHub
- [ ] Regularly review access logs
- [ ] Keep recovery information updated

---

## 📅 Handoff Information

```
Project Name: Moteib Website
Client Name: _________________________________
Handoff Date: _________________________________
Deployed By: _________________________________
Support Contact: _________________________________
Support Email: _________________________________
```

---

## 📝 Notes

```
Additional information or special instructions:

_____________________________________________________________

_____________________________________________________________

_____________________________________________________________

_____________________________________________________________
```

---

**IMPORTANT**: Store this document securely. Contains sensitive access information.

**DO NOT**:
- Commit this file to GitHub
- Share via email unencrypted
- Store in cloud without encryption
- Leave in unsecured locations

**Recommended Storage**:
- Password manager (1Password, LastPass, Bitwarden)
- Encrypted document
- Secure physical location
- Shared securely with client only
