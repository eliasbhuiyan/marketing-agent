const nodemailer = require("nodemailer");
const { inviteEmailTemplate } = require("./mailTemplate");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "eliasbhuiyan21@gmail.com",  // your email
    pass: "fhaq uskt bpmb xwdu"   // app password
  }
});

async function sendInvite({ownerEmail, memberEmail, memberName, link, brandName}) {
  await transporter.sendMail({
    from: '"MarkgenAI" <no-reply@markgenai.com>',
    to: memberEmail,
    replyTo: ownerEmail,
    subject: `You're invited to join ${brandName} as an editor on MarkgenAI`,
    html: inviteEmailTemplate(brandName, link, memberName),
  });
}

module.exports = {sendInvite}