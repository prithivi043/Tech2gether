import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { sendContactForm } from "../api/contactApi";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const data = await sendContactForm(formData);
      if (data.success) {
        setStatus("✅ Message saved to Database!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Error: " + data.message);
      }
    } catch {
      setStatus("❌ Server Error. Try again later.");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white flex items-center justify-center px-6 pt-24">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Left Side - Contact Info */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-extrabold">Let’s Connect</h2>
          <p className="text-lg text-gray-200 leading-relaxed">
            Have a project idea or just want to collaborate? Reach out via the form
            or through the details below — we’d love to hear from you!
          </p>

          <div className="space-y-4">
            <p className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <span>tech2gether2025@gmail.com</span>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-400" />
              <span>+91 90872 06990</span>
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span>Mayiladuthurai, India</span>
            </p>
            <a
              href="https://www.linkedin.com/in/tech-together-758a74381/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-blue-300 hover:text-blue-500 transition"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn Profile</span>
            </a>
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl space-y-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-gray-400 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-gray-400 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <textarea
            rows="4"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-gray-400 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition"
          >
            Send Message
          </motion.button>

          {status && <p className="text-center mt-2">{status}</p>}
        </motion.form>
      </div>
    </section>
  );
}
