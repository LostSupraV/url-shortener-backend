/**
 * Generates OTP verification email template
 * @param {string} name - User's name
 * @param {string} otp - OTP code
 * @param {number} expiryMinutes - OTP expiry time
 * @returns {{subject: string, html: string, text: string}}
 */

export function generateOTPEmail(name, otp, expiryMinutes = 10) {
  return {
    subject: "Verify Your Email",

    text: `
Hi ${name},

Your verification code is: ${otp}

This code will expire in ${expiryMinutes} minutes.

If you didn't request this verification, you can safely ignore this email.

Thanks,
URL Shortener
`,

    html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Email Verification</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellspacing="0" cellpadding="0"
          style="background:#ffffff;border-radius:12px;padding:40px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">

          <tr>
            <td align="center">
              <h1 style="margin:0;color:#2563eb;">
                Email Verification
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding-top:30px;font-size:16px;color:#333;">
              Hi <strong>${name}</strong>,
            </td>
          </tr>

          <tr>
            <td style="padding-top:15px;font-size:16px;color:#555;">
              Use the following One-Time Password (OTP) to verify your email address:
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:30px 0;">
              <div
                style="
                  display:inline-block;
                  padding:16px 40px;
                  background:#2563eb;
                  color:#fff;
                  font-size:32px;
                  font-weight:bold;
                  letter-spacing:8px;
                  border-radius:8px;
                ">
                ${otp}
              </div>
            </td>
          </tr>

          <tr>
            <td style="font-size:15px;color:#555;">
              This OTP is valid for
              <strong>${expiryMinutes} minutes</strong>.
            </td>
          </tr>

          <tr>
            <td style="padding-top:25px;font-size:14px;color:#888;">
              If you did not request this email, you can safely ignore it.
            </td>
          </tr>

          <tr>
            <td style="padding-top:35px;border-top:1px solid #eee;font-size:14px;color:#999;">
              Thanks,<br>
              <strong>URL Shortener</strong>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,
  };
}