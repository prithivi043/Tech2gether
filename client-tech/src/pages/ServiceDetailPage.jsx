// src/pages/ServiceDetailsPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft, FileText, LayoutDashboard, Code, Bug, Cloud, LifeBuoy } from "lucide-react";

// ✅ Services Data with roadmap descriptions
const servicesData = {
  "web-development": {
    title: "Web Development",
    description: "We craft blazing-fast, scalable, and responsive web solutions.",
    pricing: [
      { plan: "Basic", price: 299, tier: "basic", features: ["1 Page Website", "Basic SEO", "Hosting Setup"] },
      { plan: "Standard ⭐", price: 699, tier: "standard", features: ["5 Pages Website", "SEO Optimized", "Domain + Hosting"] },
      { plan: "Premium", price: 1299, tier: "premium", features: ["Custom Website", "E-Commerce", "Ongoing Support"] },
    ],
    roadmap: [
      { step: "Requirement Gathering", desc: "We understand your business needs and goals to plan the perfect solution." },
      { step: "Wireframing & Design", desc: "We create visual layouts and designs to ensure a smooth user experience." },
      { step: "Development", desc: "Our developers build your solution with clean, scalable code." },
      { step: "Testing", desc: "We rigorously test for bugs, performance, and usability." },
      { step: "Hosting & Launch", desc: "We deploy your project live with proper hosting and support." },
    ],
    discount: "🔥 20% OFF for first-time clients this month!",
  },
  "poster-design": {
    title: "Poster Design",
    description: "Eye-catching posters that make your brand stand out.",
    pricing: [
      { plan: "Basic", price: 49, tier: "basic", features: ["1 Poster Design", "Digital Format", "2 Revisions"] },
      { plan: "Standard ⭐", price: 99, tier: "standard", features: ["5 Posters", "Print + Digital Ready", "Custom Branding"] },
      { plan: "Premium", price: 199, tier: "premium", features: ["Unlimited Posters", "Advanced Graphics", "Priority Delivery"] },
    ],
    roadmap: [
      { step: "Requirement Gathering", desc: "We collect the theme, content, and goals for your poster." },
      { step: "Concept Sketches", desc: "We create rough drafts to visualize ideas quickly." },
      { step: "Design Draft", desc: "We develop a detailed poster design based on selected concept." },
      { step: "Revisions", desc: "We refine the poster until it perfectly matches your vision." },
      { step: "Final Delivery", desc: "We provide high-quality files ready for print or digital use." },
    ],
    discount: "🎨 Get 1 FREE poster when you order 3 or more!",
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    description: "We design beautiful, functional, and user-friendly interfaces.",
    pricing: [
      { plan: "Starter", price: 199, tier: "basic", features: ["Wireframes", "1 Platform", "Basic UI Kit"] },
      { plan: "Pro ⭐", price: 499, tier: "standard", features: ["Interactive Prototypes", "Cross-Platform", "Custom Components"] },
      { plan: "Enterprise", price: 999, tier: "premium", features: ["Full UI/UX Suite", "Research & Testing", "Ongoing Support"] },
    ],
    roadmap: [
      { step: "Research", desc: "We study user needs, competitors, and market trends." },
      { step: "Wireframes", desc: "We create blueprint layouts for smooth navigation." },
      { step: "Prototyping", desc: "We build interactive models for real-time testing." },
      { step: "Design System", desc: "We develop a complete UI kit and style guide." },
      { step: "Testing & Delivery", desc: "We validate usability and deliver the final design assets." },
    ],
    discount: "💡 Free usability audit with every Pro package!",
  },
};

// 🎨 Tier colors
const tierColors = {
  basic: "from-gray-200/40 to-gray-100/20 border-gray-300/40 hover:from-gray-300/50 hover:to-gray-200/30",
  standard: "from-blue-400/40 to-blue-200/20 border-blue-300/40 hover:from-blue-500/50 hover:to-blue-300/30",
  premium: "from-yellow-400/40 to-yellow-200/20 border-yellow-300/40 hover:from-yellow-500/50 hover:to-yellow-300/30",
};

// ✅ Convert USD → INR-like value
const convertToRupeesLikeDollar = (usd) => `$${(usd / 83).toFixed(2)}`;

// ✅ Extra features based on price
const generateExtraFeatures = (price) => {
  if (price > 1000) return ["Priority Support", "Lifetime Updates", "Dedicated Project Manager", "Advanced Analytics"];
  if (price > 500) return ["Priority Email Support", "Free Consultation", "Performance Optimization"];
  if (price > 200) return ["Email Support", "Free Basic Consultation"];
  return [];
};

// ✅ Roadmap icons
const roadmapIcons = [FileText, LayoutDashboard, Code, Bug, Cloud, LifeBuoy];

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const service = servicesData[id];

  if (!service) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-500">Service Not Found</h2>
        <Link to="/services" className="text-blue-600 underline">Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* Title */}
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          {service.title}
        </motion.h1>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mt-4">{service.description}</p>

        {/* Discount Banner */}
        <div className="mt-8 bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg shadow-md text-center font-medium text-gray-800">
          {service.discount}
        </div>

        {/* Pricing Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {service.pricing.map((plan, idx) => {
              const extraFeatures = generateExtraFeatures(plan.price);
              const allFeatures = [...plan.features, ...extraFeatures];
              return (
                <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }} viewport={{ once: true }}
                  className={`rounded-2xl shadow-xl backdrop-blur-xl bg-gradient-to-br ${tierColors[plan.tier]} border p-8 transition hover:scale-[1.05]`}>
                  <h3 className="text-xl font-semibold text-gray-800">{plan.plan}</h3>
                  <p className="text-3xl font-extrabold text-blue-700 my-4">{convertToRupeesLikeDollar(plan.price)}</p>
                  <ul className="space-y-2 text-gray-700">
                    {allFeatures.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <CheckCircle className="text-green-600 w-5 h-5" /> {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 rounded-xl shadow hover:from-blue-700 hover:to-cyan-600 transition">
                    Choose Plan
                  </button>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Roadmap Section with Timeline */}
        <section className="mt-20">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-900">Roadmap to Your Success 🚀</h2>
          <div className="relative max-w-4xl mx-auto">

            {/* Vertical Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full rounded-full"></div>

            {service.roadmap.map((stepObj, idx) => {
              const Icon = roadmapIcons[idx % roadmapIcons.length];
              return (
                <motion.div key={idx} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.3 }} viewport={{ once: true }}
                  className={`mb-12 flex items-center relative ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>

                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10"></div>

                  {/* Step Card */}
                  <div className={`relative w-1/2 p-6 rounded-2xl shadow-lg backdrop-blur-xl bg-white/20 border border-white/30 transition-transform hover:scale-105 ${idx % 2 === 0 ? "mr-auto" : "ml-auto"}`}
                    style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.3))` }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-blue-500 p-2 rounded-full"><Icon className="w-5 h-5 text-white" /></div>
                      <h3 className="text-xl font-bold text-gray-900">{stepObj.step}</h3>
                    </div>
                    <p className="text-gray-700 text-sm">{stepObj.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Back Button */}
        <div className="mt-16 text-center">
          <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-xl shadow hover:bg-gray-900 transition">
            <ArrowLeft className="w-5 h-5" /> Back to Services
          </Link>
        </div>

      </div>
    </div>
  );
}
