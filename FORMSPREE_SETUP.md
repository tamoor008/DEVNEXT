# Formspree Setup Guide

## Step 1: Create Formspree Account

1. Go to [https://formspree.io](https://formspree.io)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Create Two Forms in Formspree

### Form 1: "Get In Touch" Form (Home Page)
1. In your Formspree dashboard, click "New Form"
2. Name it: "Get In Touch Form" or "Home Page Contact"
3. Copy the **Form ID** (it will look like: `xrgkqjpn` or `https://formspree.io/f/xrgkqjpn`)
4. Save this Form ID - you'll need it for `components/ContactForm.tsx`

### Form 2: "Contact Us" Form (Contact Page)
1. Click "New Form" again
2. Name it: "Contact Us Form" or "Contact Page Form"
3. Copy the **Form ID** (different from the first one)
4. Save this Form ID - you'll need it for `app/contact/page.tsx`

## Step 3: Configure Form Settings (Optional but Recommended)

For each form in Formspree:
1. Go to Settings → Email Notifications
2. Set your email address to receive submissions
3. Customize the email template if needed
4. Enable spam protection (reCAPTCHA) if desired

## Step 4: Get Your Form Endpoints

Each form will have an endpoint like:
- `https://formspree.io/f/YOUR_FORM_ID`

You'll need:
- Form ID 1 for the "Get In Touch" form
- Form ID 2 for the "Contact Us" form

## Step 5: Integration

The forms have been updated to use Formspree. You just need to:
1. Replace `YOUR_FORM_ID_1` in `components/ContactForm.tsx` with your first Form ID
2. Replace `YOUR_FORM_ID_2` in `app/contact/page.tsx` with your second Form ID

## Step 6: Test Your Forms

1. Fill out and submit the "Get In Touch" form on your home page
2. Check your Formspree dashboard and email for the submission
3. Fill out and submit the "Contact Us" form on your contact page
4. Verify both forms are working correctly

## Important Notes

- Free plan allows 50 submissions per month
- Formspree handles spam protection automatically
- Submissions are stored in your Formspree dashboard
- You can set up email notifications to receive submissions via email
- For production, consider upgrading to a paid plan for more submissions and features

