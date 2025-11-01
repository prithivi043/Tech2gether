// src/pages/ServicesPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code, Palette, PenTool } from "lucide-react";

const services = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Crafting high-performing, secure, and scalable websites tailored for modern businesses.",
    icon: <Code className="w-10 h-10 text-cyan-500" />,
    cta: "Get Started",
  },
  {
    id: "poster-design",
    title: "Poster Design",
    description:
      "Impactful poster designs that capture attention and deliver your message with style.",
    icon: <Palette className="w-10 h-10 text-pink-500" />,
    cta: "Request Design",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Designing intuitive and delightful user experiences for apps and digital products.",
    icon: <PenTool className="w-10 h-10 text-green-500" />,
    cta: "Explore Design",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-20 px-6 lg:px-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Our <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Services</span>
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          We provide cutting-edge digital solutions that help your brand grow and
          succeed. Explore our services tailored for businesses of every scale.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl p-8 transition transform hover:-translate-y-2 border border-gray-100 group"
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner mb-6 group-hover:scale-110 transition">
              {service.icon}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              {service.description}
            </p>

            {/* CTA Button */}
            <Link
              to={`/services/${service.id}#offers`}
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
            >
              {service.cta}
            </Link>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="text-center mt-20"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Build Something Great?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          From startups to enterprises, we craft solutions that drive growth and success.
        </p>
        <Link
          to="/contact"
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-10 py-4 rounded-2xl shadow-lg hover:from-cyan-600 hover:to-blue-700 transition"
        >
          Contact Us
        </Link>
      </motion.div>
    </div>
  );
}
