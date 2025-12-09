import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email, phone, countryCode, source } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // 1. Configure Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 2. Format Phone Number
    const fullPhone = phone ? `${countryCode} ${phone}` : 'Not provided';

    // 3. Email Template for User (Aesthetic & Professional)
    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
      <body style="margin: 0; padding: 0; background-color: #f5f5f4; font-family: 'Times New Roman', serif;">
        <div style="max-w-xl mx-auto bg-white p-8 md:p-12 border-top: 4px solid #b45309; margin-top: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1c1917; letter-spacing: 0.1em; text-transform: uppercase; font-size: 24px; margin: 0;">Tyohar</h1>
            <p style="color: #b45309; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; margin-top: 5px;">Premium Gifting</p>
          </div>

          <p style="color: #44403c; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            Hello,
          </p>
          <p style="color: #44403c; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            Thank you for reserving your place on our waitlist. You have taken the first step towards a more thoughtful way of gifting.
          </p>
          <p style="color: #44403c; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            We are curating a collection that bridges distance with elegance. As an early member, you will receive priority access and an exclusive launch privilege when we go live.
          </p>
          
          <div style="background-color: #fafaf9; padding: 20px; text-align: center; margin: 30px 0;">
            <p style="color: #1c1917; font-weight: bold; margin: 0; letter-spacing: 0.05em;">Your Status: Confirmed</p>
          </div>

          <div style="border-top: 1px solid #e7e5e4; padding-top: 20px; text-align: center; margin-top: 40px;">
            <p style="color: #78716c; font-size: 12px; font-family: sans-serif;">
              Real Emotions. Delivered.<br>
              &copy; 2025 Tyohar. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 4. Send Email to Admin (Internal Notification)
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Waitlist Signup: ${email}`,
      text: `New entry from ${source} section.\nEmail: ${email}\nPhone: ${fullPhone}`,
      html: `
        <div style="font-family: sans-serif;">
          <h2>New Lead Captured</h2>
          <p><strong>Source:</strong> ${source}</p>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${fullPhone}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Date</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString()}</td></tr>
          </table>
        </div>
      `,
    });

    // 5. Send Confirmation to User
    await transporter.sendMail({
      from: `"Tyohar Concierge" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Welcome to the Inner Circle",
      html: userEmailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}