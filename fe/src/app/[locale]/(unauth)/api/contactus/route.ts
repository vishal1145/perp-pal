import connectDB from "@/libs/DB";
import contactUs from "@/models/ContactUs";
import { NextResponse, NextRequest } from 'next/server'
import process from "process";
const nodemailer = require('nodemailer');

export async function POST(request: NextRequest) {
  await connectDB();
  const { formData } = await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODE_MAILER_EMAIL,
      pass: process.env.NODE_MAILER_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.NODE_MAILER_EMAIL,
      to: process.env.NODE_MAILER_EMAIL,
      replyTo: process.env.NODE_MAILER_EMAIL,
      subject: `Preppal Contact Support ${formData.email}`,
      html: `
        <h2>New Query</h2>
        <p>Name: ${formData.name} </p>
        <p>Email: ${formData.email} </p>
        <p>Message: ${formData.query} </p>
        `,
    })

    const newQuery = new contactUs({
      name: formData.name,
      emailOrPhone: formData.email,
      query: formData.query
    })

    await newQuery.save();

    return NextResponse.json({ message: "Success: email was sent" }, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "COULD NOT SEND MESSAGE" }, { status: 500 })
  }

}
