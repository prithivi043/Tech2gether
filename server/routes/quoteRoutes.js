// server/routes/quoteRoutes.js
import express from "express";
import dotenv from "dotenv";
import Quote from "../models/Quote.js";
import SibApiV3Sdk from "sib-api-v3-sdk";

dotenv.config();
const router = express.Router();

// Brevo setup
const defaultClient = SibApiV3Sdk.ApiClient.instance;
defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

router.post("/", async (req, res) => {
  const { clientId, name, email, mobile, service, plan, budget, message } = req.body;

  if (!clientId || !name || !email || !mobile || !service || !plan || !budget) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }

  try {
    const newQuote = new Quote({ clientId, name, email, mobile, service, plan, budget, message });
    await newQuote.save();

    // Send emails
    await Promise.all([
      // 📩 Admin Email
      apiInstance.sendTransacEmail({
        sender: { email: process.env.ADMIN_EMAIL, name: "Tech2gether" },
        to: [{ email: process.env.ADMIN_EMAIL }],
        subject: `📝 New Quote Request - ${name} (${clientId})`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #4f46e5;">New Quote Request Received</h2>
            <p>A new client has submitted a quote request. Here are the details:</p>
            <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
              <tr><td style="padding:8px;border:1px solid #ddd;"><b>Client Name</b></td><td style="padding:8px;border:1px solid #ddd;">${name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;"><b>Client ID</b></td><td style="padding:8px;border:1px solid #ddd;">${clientId}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;"><b>Client Email</b></td><td style="padding:8px;border:1px solid #ddd;">${email}</td></tr>
            </table>
            <p style="margin-top:15px;">Please reach out to the client for further details or follow-up.</p>
            <p style="font-size:12px;color:#666;">— Tech2gether Notification System</p>
          </div>
        `,
      }),

      // 📬 Client Confirmation Email
      apiInstance.sendTransacEmail({
        sender: { email: process.env.ADMIN_EMAIL, name: "Tech2gether" },
        to: [{ email }],
        subject: "✅ Your Quote Request Has Been Received",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #4f46e5;">Hello ${name},</h2>
            <p>Thank you for requesting a quote with <b>Tech2gether</b>! Here’s a summary of your request:</p>
            <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
              <tr><td style="padding:8px;border:1px solid #ddd;"><b>Client ID</b></td><td style="padding:8px;border:1px solid #ddd;">${clientId}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;"><b>Service</b></td><td style="padding:8px;border:1px solid #ddd;">${service}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;"><b>Plan</b></td><td style="padding:8px;border:1px solid #ddd;">${plan}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;"><b>Budget (USD)</b></td><td style="padding:8px;border:1px solid #ddd;">$${budget}</td></tr>
            </table>
            <p style="margin-top:15px;">Our team will review your requirements and contact you shortly.</p>
            <p style="margin-top:20px;">Best regards,<br/><b>Team Tech2gether</b></p>
          </div>
        `,
      }),
    ]);

    res.json({ success: true, message: "Quote saved and emails sent successfully." });
  } catch (err) {
    console.error("❌ Backend Error:", err.message);
    if (err.message.includes("Unauthorized")) {
      return res.status(401).json({ success: false, error: "Unauthorized - invalid Brevo API key or IP not whitelisted" });
    }
    res.status(500).json({ success: false, error: err.message });
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
