const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "eliasbhuiyan21@gmail.com",  // your email
    pass: "fhaq uskt bpmb xwdu"   // app password
  }
});

async function sendInvite(ownerEmail,email, link) {
  await transporter.sendMail({
    from: '"Brand AI" <no-reply@yourapp.com>',
    to: email,
    replyTo: ownerEmail,
    subject: "You're invited to join a brand",
    html: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>You're invited to join a brand</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.05);
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
      }
      .header h2 {
        color: #333;
        margin: 0;
      }
      .content {
        margin: 20px 0;
        font-size: 16px;
        color: #555;
        line-height: 1.6;
      }
      .center{
      display: flex;
      justify-content: center;
      }
      .btn {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 20px;
        background-color: #4f46e5;
        color: #fff;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #888;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Marketing Agent</h2>
      </div>
      <div class="content">
        <p>Hi {{userName}},</p>
        <p>
          You've been invited to join <strong>{{brandName}}</strong> as an 
          <strong>Editor</strong> on <strong>Marketing Agent</strong>.
        </p>
        <p>
          Click the button below to accept the invitation and start collaborating with the team.
        </p>
        <div class="center">
        <a href="${link}" class="btn">Accept Invitation</a>
        </div>
      </div>
      <div class="footer">
        <p>
          If you did not expect this invitation, you can safely ignore this email.
        </p>
        <p>&copy; 2025 Marketing Agent. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`
  });
}


module.exports = {sendInvite}