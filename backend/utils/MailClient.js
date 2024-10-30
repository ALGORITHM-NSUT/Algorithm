import nodemailer from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config();


export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // set to true if using port 465
  auth: {
    user: process.env.SMTP_USER, // using environment variable for security
    pass: process.env.SMTP_PASS,
  }

});