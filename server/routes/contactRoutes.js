import express from "express";
import dotenv from "dotenv";
import Contact from "../models/Contact.js";
import SibApiV3Sdk from "sib-api-v3-sdk";

dotenv.config();
const router = express.Router();

// Initialize Brevo client
const defaultClient = SibApiV3Sdk.ApiClient.instance;
defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // ✅ Save to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // ✅ Email to YOU (admin)
    await apiInstance.sendTransacEmail({
      sender: { email: "prithivigithub043@gmail.com", name: "Tech2gether" },
      to: [{ email: "prithivigithub043@gmail.com" }], // Replace with your email
      subject: `📩 New Contact Form Submission - ${name}`,
      htmlContent: `
        <h2>📬 New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background:#f9f9f9;padding:10px;border-left:3px solid #007BFF;">
          ${message}
        </blockquote>
        <br/>
        <p>📅 Received on: ${new Date().toLocaleString()}</p>
      `,
    });

    // ✅ Professional Auto-Reply to Visitor
    await apiInstance.sendTransacEmail({
      sender: { email: "prithivigithub043@gmail.com", name: "Tech2gether" },
      to: [{ email }],
      subject: "✅ Your message has been received – Tech2gether",
      htmlContent: `
        <div style="font-family:Arial,sans-serif;color:#333;line-height:1.6;">
          <h2 style="color:#007BFF;">Hello ${name},</h2>
          <p>Thank you for contacting <strong>Tech2gether</strong>.</p>
          <p>We have successfully received your message and our team will review it shortly. 
          You can expect a response within <strong>24–48 hours</strong>.</p>
          <p>If your query is urgent, feel free to reach us directly at 
          <a href="mailto:prithivigithub043@gmail.com">prithivigithub043@gmail.com</a>.</p>
          <br/>
          <p>We appreciate your interest and look forward to assisting you.</p>
          <br/>
          <p>Best regards,</p>
          <p><strong>Team Tech2gether</strong><br/>
          🌐 <a href="https://tech2gether.vercel.app" target="_blank">Visit our Website</a></p>
        </div>
      `,
    });

    res.json({ success: true, message: "Message saved & professional emails sent!" });
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
