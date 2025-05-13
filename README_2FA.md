# Using 2FA Authentication with Docker Hub in Playwright

This guide explains how to use Two-Factor Authentication (2FA) with the Docker Hub Playwright automation script.

## Prerequisites

1. Docker Hub account with 2FA enabled
2. Access to your authenticator app (Google Authenticator, Authy, Microsoft Authenticator, etc.)

## How to Get Your TOTP Secret Key

To automate 2FA authentication, you need the TOTP secret key (not the 6-digit code). Here's how to get it:

### Option 1: During 2FA Setup

When setting up 2FA on Docker Hub, you'll be shown a QR code and possibly a secret key. Copy the secret key before completing the setup.

### Option 2: From Existing Setup

If you've already set up 2FA:

**Google Authenticator:**
1. Export accounts (three dots menu > Transfer accounts > Export accounts)
2. Scan the QR code with another device
3. The QR code contains a URL like `otpauth://totp/Docker:%20username?secret=ABCDEF123456...`
4. The part after `secret=` is your TOTP secret

**Authy:**
1. Unfortunately, Authy doesn't allow easy export of secrets
2. You may need to disable and re-enable 2FA on Docker Hub

**Other Authenticator Apps:**
1. Check if your app has an export or backup feature
2. Look for the secret key in the export data

## Setting Up the Script

1. Copy the TOTP secret to the `DOCKER_TOTP_SECRET` variable in the script or your environment
2. The script will generate valid 2FA codes automatically during the login process

## Troubleshooting

- **Invalid Codes**: Ensure your system clock is synchronized correctly
- **Code Expired**: The script automatically generates a fresh code during execution
- **Format Issues**: The TOTP secret should be base32-encoded (typically letters A-Z and numbers 2-7)

## Security Considerations

⚠️ **Important**: The TOTP secret provides complete access to generate valid 2FA codes. Keep it secure:

- Don't commit it to public repositories
- Store it in a secure environment variable or secret manager
- Limit access to the system running this script
