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
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center px-6 pt-24 bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=1920&auto=format&fit=crop')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-blue-900/80 to-sky-900/70"></div>

      <div className="relative max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
        {/* Left Side - Contact Info */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-extrabold">Let’s Connect</h2>
          <p className="text-lg text-gray-200 leading-relaxed">
            Have a project idea or just want to collaborate? Reach out via the
            form or through the details below — we’d love to hear from you!
          </p>

          <address className="not-italic space-y-4">
            <p className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-400" aria-hidden="true" />
              <a href="mailto:tech2gether2025@gmail.com" className="hover:underline">
                tech2gether2025@gmail.com
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-400" aria-hidden="true" />
              <a href="tel:+919087206990" className="hover:underline">
                +91 90872 06990
              </a>
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-400" aria-hidden="true" />
              <span>Mayiladuthurai, India</span>
            </p>
            <a
              href="https://www.linkedin.com/in/tech-together-758a74381/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-blue-300 hover:text-blue-500 transition"
            >
              <Linkedin className="w-5 h-5" aria-hidden="true" />
              <span>LinkedIn Profile</span>
            </a>
          </address>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl space-y-6"
          aria-label="Contact Form"
        >
          <label className="sr-only" htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-gray-400 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <label className="sr-only" htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-gray-400 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <label className="sr-only" htmlFor="message">Your Message</label>
          <textarea
            rows="4"
            id="message"
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
