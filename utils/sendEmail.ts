// path: C:\Users\Sunny\Documents\My Projects\New folder\price-monitor\utils\sendEmail.ts

import nodemailer from 'nodemailer';

export const sendEmail = async (subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: process.env.NODEMAILER_EMAIL, // Or any recipient email
    subject,
    text,
  });
};

