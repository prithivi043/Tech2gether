import express from "express";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // 1️⃣ Email to YOU (admin)
    await resend.emails.send({
      from: "Tech2gether <onboarding@resend.dev>", // Or your verified domain email
      to: "your-email@example.com",  // <-- Replace with your email
      subject: `📩 New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // 2️⃣ Auto-reply to Visitor
    await resend.emails.send({
      from: "Tech2gether <onboarding@resend.dev>", // Must be verified sender
      to: email, // Send back to visitor
      subject: "Thanks for contacting Tech2gether!",
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for visiting <strong>Tech2gether</strong> and reaching out to us.</p>
        <p>We have received your message and will get back to you shortly.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>Team Tech2gether</strong></p>
      `,
    });

    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Resend Error:", error);
    res.status(500).json({ success: false, error: "Email failed to send." });
  }
});

// 📥 GET: Fetch all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    console.error("❌ Fetch contacts error:", error);
    res.status(500).json({ success: false, message: "Error fetching messages" });
  }
});

export default router;
