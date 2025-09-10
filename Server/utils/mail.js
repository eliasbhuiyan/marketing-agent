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
    html: `<p>You’ve been invited! Click below to accept:</p>
           <a href="${link}">Accept Invite</a>`
  });
}


module.exports = {sendInvite}