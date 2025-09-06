import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.json({ success: true, message: "Message saved in MongoDB!" });
  } catch (error) {
    console.error("❌ Contact save error:", error);
    res.status(500).json({ success: false, message: "Error saving message" });
  }
});

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
