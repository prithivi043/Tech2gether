import express from "express";
import { Resend } from "resend";
import dotenv from "dotenv";
import Contact from "../models/Contact.js";

dotenv.config();

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // ✅ Save to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // ✅ Email to YOU (admin)
    await resend.emails.send({
      from: "Tech2gether <onboarding@resend.dev>", // use verified sender
      to: "your-email@example.com",  // <-- replace with your email
      subject: `📩 New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // ✅ Auto-reply to visitor (only send, don’t save)
    await resend.emails.send({
      from: "Tech2gether <onboarding@resend.dev>",
      to: email,
      subject: "✅ Thanks for contacting Tech2gether!",
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for reaching out to <strong>Tech2gether</strong>.</p>
        <p>We’ve received your message and will get back to you shortly.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>Team Tech2gether</strong></p>
      `,
    });

    res.status(200).json({ success: true, message: "Message saved & emails sent!" });
  } catch (error) {
    console.error("❌ Error in contact route:", error);
    res.status(500).json({ success: false, error: "Something went wrong." });
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
