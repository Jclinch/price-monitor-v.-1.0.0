// path: C:\Users\Sunny\Documents\My Projects\New folder\price-monitor\utils\sendEmail.ts

import nodemailer from "nodemailer";

async function testEmail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "ghostwarzone2222@gmail.com", // Replace with your email for testing
    subject: "Test Email",
    text: "This is a test email.",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Test email sent successfully");
  } catch (error) {
    console.error("Failed to send test email:", error);
  }
}

testEmail();
