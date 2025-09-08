import express from "express";
import dotenv from "dotenv";
import Quote from "../models/Quote.js";
import SibApiV3Sdk from "sib-api-v3-sdk";

dotenv.config();
const router = express.Router();

// Initialize Brevo client
const defaultClient = SibApiV3Sdk.ApiClient.instance;
defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// POST /api/quotes
router.post("/", async (req, res) => {
  console.log("Incoming Quote Request:", req.body);

  const { clientId, name, email, mobile, service, plan, budget, message } = req.body;

  // Validate required fields
  if (!clientId || !name || !email || !mobile || !service || !plan || !budget) {
    console.log("❌ Missing fields:", req.body);
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }

  try {
    // Save to MongoDB
    const newQuote = new Quote({ clientId, name, email, mobile, service, plan, budget, message });
    await newQuote.save();
    console.log("✅ Quote saved in DB");

    // Send emails in parallel
    const adminEmailPromise = apiInstance.sendTransacEmail({
      sender: { email: process.env.ADMIN_EMAIL, name: "Tech2gether" },
      to: [{ email: process.env.ADMIN_EMAIL }],
      subject: `📑 New Quote Request - ${name} (${clientId})`,
      htmlContent: `<p>New quote request received.</p>
        <p><strong>Client:</strong> ${name} (${clientId})<br/>
        <strong>Email:</strong> ${email}<br/>
        <strong>Mobile:</strong> ${mobile}<br/>
        <strong>Service:</strong> ${service}<br/>
        <strong>Plan:</strong> ${plan}<br/>
        <strong>Budget:</strong> ${budget}<br/>
        <strong>Message:</strong> ${message || "N/A"}</p>`,
    });

    const clientEmailPromise = apiInstance.sendTransacEmail({
      sender: { email: process.env.ADMIN_EMAIL, name: "Tech2gether" },
      to: [{ email }],
      subject: "✅ Your Quote Request has been received",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://tech2gether.vercel.app/tech2gether_logo.png" alt="Tech2gether Logo" style="width: 150px;"/>
          </div>
          <h2 style="color: #0d47a1; text-align: center;">Thank you for reaching out, ${name}!</h2>
          <p>We have successfully received your quote request for <strong>${service}</strong> with the <strong>${plan}</strong> plan.</p>
          <p>Our team will review your request and contact you within <strong>24–48 hours</strong>.</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
          <p style="font-size: 14px; color: #555;">
            For more information, visit our website: 
            <a href="https://www.tech2gether.com" target="_blank" style="color: #0d47a1; text-decoration: none;">www.tech2gether.com</a>
          </p>
          <p style="text-align: center; font-size: 12px; color: #999;">© 2025 Tech2gether. All rights reserved.</p>
        </div>
      `,
    });

    await Promise.all([adminEmailPromise, clientEmailPromise]);
    console.log("✅ Emails sent successfully");

    res.json({ success: true, message: "Quote saved & emails sent!" });

  } catch (error) {
    console.error("❌ Backend Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/quotes
router.get("/", async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json({ success: true, data: quotes });
  } catch (error) {
    console.error("❌ Fetch Quotes Error:", error);
    res.status(500).json({ success: false, message: "Error fetching quotes" });
  }
});

export default router;
