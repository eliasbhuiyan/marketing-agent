const inviteEmailTemplate = (brandName, inviteLink, memberName) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>You're invited to join ${brandName}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#111;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f4f6f8;padding:30px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(16,24,40,0.06);">
            <!-- Header -->
            <tr>
               <td style="display:flex; justify-content: center; padding: 30px 0;">
                <img style="width: 100%; max-width: 250px" src="http://localhost:3000/markgenailogo.jpeg" alt="markgenailogo">
               </td> 
            </tr>
            <tr>
              <td style="padding:24px 28px;background:linear-gradient(90deg,#4f46e5,#06b6d4);color:#ffffff;">
                <h1 style="margin:0;font-size:20px;font-weight:700;line-height:1.1; text-align: center;">Invitation to join <span style="font-weight:800;">${brandName}</span> as an editor on MarkgenAI</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:24px 28px;">
                <p style="margin:0 0 12px;font-size:15px;color:#0b1220;">
                  Hi <strong>${memberName}</strong>,
                </p>

                <p style="margin:0 0 16px;font-size:15px;color:#334155;">
                  You've been invited to join <strong>${brandName}</strong> as an editor on MarkgenAI.
                  Joining will give you access to collaborate on campaigns, create and publish content.
                </p>

                <!-- Invitation details card -->
                <table cellpadding="0" cellspacing="0" role="presentation" style="width:100%;border:1px solid #e6eef6;border-radius:6px;background:#fbfdff;margin:12px 0 18px;">
                  <tr>
                    <td style="padding:12px 14px;">
                      <p style="margin:0;font-size:13px;color:#475569;">
                        <strong>Brand:</strong> ${brandName}<br/>
                        <strong>Role:</strong> Editor<br/>
                      </p>
                    </td>
                  </tr>
                </table>

                <!-- CTA buttons -->
                <table cellpadding="0" cellspacing="0" role="presentation" style="margin:0 0 16px; width:100%;">
                  <tr>
                    <td style="padding-right:10px; width:100%;">
                      <a href="${inviteLink}" target="_blank" style="display:block; width: fit-content; padding:12px 20px;background:#4f46e5;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:700;font-size:15px; margin: auto;">
                        Accept Invitation
                      </a>
                    </td>
                  </tr>
                </table>

                <hr style="border:none;border-top:1px solid #eef2f7;margin:18px 0;">

                <p style="margin:0;font-size:13px;color:#475569;">
                  Thanks,<br/>
                  &mdash; MarkgenAI Team
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:16px 28px;background:#f8fafc;border-top:1px solid #eef2f7;">
                <p style="margin:0;font-size:12px;color:#94a3b8;">
                  This invitation is for <strong>${memberName}</strong>. The invitation link expires in <strong>3 days</strong>.
                </p>
                <p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">
                  If you do not want to receive invitations, you can ignore this email.
                </p>
                <p style="margin:12px 0 0;font-size:12px;color:#94a3b8;">
                  © <span id="year">${new Date().getFullYear()}</span> MarkgenAI. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;

module.exports = { inviteEmailTemplate };