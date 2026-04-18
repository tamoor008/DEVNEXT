import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, 
      email, 
      phone, 
      brand, 
      message,
      _subject // Optional custom subject prefix
    } = body;

    // Create a transporter
    // Note: User will need to provide these env variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'shayanmalik1107@gmail.com',
        pass: process.env.EMAIL_PASS, // App Password
      },
    });

    // Email content construction
    const mailOptions = {
      from: `"Technifuse" <${process.env.EMAIL_USER || 'shayanmalik1107@gmail.com'}>`,
      to: process.env.EMAIL_TO || 'technifuse2005@gmail.com',
      subject: _subject || `New Inquiry from ${name} (${brand || 'New Brand'})`,
      text: `
        New inquiry from TechniFuse website:
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'N/A'}
        Brand: ${brand || 'N/A'}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #6366f1;">New Inquiry from TechniFuse Website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Brand:</strong> ${brand || 'N/A'}</p>
          <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please check server configuration.' }, 
      { status: 500 }
    );
  }
}
