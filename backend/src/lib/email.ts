// src/lib/email.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface SendOpts {
  to: string;
  subject: string;
  html: string;
  replyTo?: string; // LESSON FROM LAST BUILD: this was missing before — always set
  // it on customer-facing auto-replies so hitting "reply" actually reaches someone.
}

export const sendEmail = async (opts: SendOpts) => {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM || `"Techive IT Solutions" <${process.env.SMTP_USER}>`,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    replyTo: opts.replyTo,
  });
};

export const sendContactNotification = async (data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) => {
  return sendEmail({
    to: process.env.ADMIN_EMAIL as string,
    subject: `New inquiry from ${data.name}`,
    replyTo: data.email,
    html: `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || "—"}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  });
};

export const sendContactAutoReply = async (data: { name: string; email: string }) => {
  return sendEmail({
    to: data.email,
    subject: "Thanks for reaching out to Techive IT Solutions",
    replyTo: process.env.ADMIN_EMAIL,
    html: `
      <p>Hi ${data.name},</p>
      <p>Thanks for getting in touch with Techive IT Solutions. We've received your message and one of our team will respond within 1 business day.</p>
      <p>— The Techive Team</p>
    `,
  });
};

export const sendNewsletterWelcome = async (email: string) => {
  return sendEmail({
    to: email,
    subject: "Welcome to the Techive newsletter",
    replyTo: process.env.ADMIN_EMAIL,
    html: `<p>Thanks for subscribing — you'll hear from us with updates on our work and Academy courses.</p>`,
  });
};
