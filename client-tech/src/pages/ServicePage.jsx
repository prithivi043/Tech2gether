// src/pages/ServicesPage.jsx
import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";

// ✅ Lazy load lucide-react icons
const Globe = lazy(() => import("lucide-react").then(m => ({ default: m.Globe })));
const Palette = lazy(() => import("lucide-react").then(m => ({ default: m.Palette })));
const Layout = lazy(() => import("lucide-react").then(m => ({ default: m.Layout })));

export default function ServicesPage() {
  const services = [
    {
      title: "Web Development",
      description:
        "We craft fast, scalable, and responsive web solutions. From personal portfolios to enterprise platforms, our websites are built with the latest technologies for speed, security, and SEO.",
      points: [
        "Custom Website Development",
        "Full-Stack Web Applications",
        "SEO & Performance Optimization",
        "Responsive & Mobile-First Design",
      ],
      cta: "Get Started",
      icon: <Globe size={40} className="text-blue-300" />,
    },
    {
      title: "Poster Design",
      description:
        "Our creative team builds visually striking posters that amplify your message. Perfect for events, marketing campaigns, and branding promotions, blending clarity with impact.",
      points: [
        "Event & Promotional Posters",
        "Digital & Print-Ready Designs",
        "Custom Branding Elements",
        "Creative Marketing Visuals",
      ],
      cta: "Request Design",
      icon: <Palette size={40} className="text-pink-300" />,
    },
    {
      title: "UI/UX Design",
      description:
        "We design user experiences that are both beautiful and functional. Our UI/UX solutions enhance usability, engagement, and customer satisfaction across devices.",
      points: [
        "Wireframes & Interactive Prototypes",
        "Mobile & Web App Interfaces",
        "Usability Testing & Feedback",
        "Interactive Visual Experiences",
      ],
      cta: "Explore More",
      icon: <Layout size={40} className="text-green-300" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 via-blue-900 to-blue-950 text-gray-100 font-sans">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent mb-6"
        >
          Our Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-blue-200 text-lg leading-relaxed"
        >
          Tech2gether delivers digital solutions that help your brand grow.
          From modern websites to engaging visuals and intuitive designs—we
          create results that make an impact.
        </motion.p>
      </section>

      {/* Services List */}
      <section className="pb-24 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        <Suspense fallback={<div className="text-blue-200">Loading services...</div>}>
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition transform group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-white/10">{service.icon}</div>
                <h3 className="text-2xl font-semibold">{service.title}</h3>
              </div>
              <p className="text-blue-100 mb-6 text-base">{service.description}</p>
              <ul className="list-disc list-inside text-blue-200 space-y-2 mb-6">
                {service.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <a
                href="#"
                className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:from-cyan-500 hover:to-blue-600 transition"
              >
                {service.cta}
              </a>
            </motion.div>
          ))}
        </Suspense>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-6 bg-gradient-to-r from-blue-800 to-indigo-900 text-center"
      >
        <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Let’s Build Something Great
        </h3>
        <p className="text-blue-200 mb-8 max-w-2xl mx-auto text-lg">
          From startups to enterprises, Tech-Together is ready to bring your
          ideas to life with innovation and expertise.
        </p>
        <a
          href="#contact"
          className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold px-10 py-4 rounded-2xl shadow-lg hover:from-cyan-500 hover:to-blue-600 transition"
        >
          Contact Us
        </a>
      </motion.section>
    </div>
  );
}
