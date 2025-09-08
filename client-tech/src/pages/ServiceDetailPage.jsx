// src/components/SmartEstimator.jsx
import React, { useState } from "react";
import { CheckCircle, Calendar, ArrowRight, FileText, LayoutDashboard, Code, Bug, Cloud, LifeBuoy } from "lucide-react";
import { motion } from "framer-motion";

// ✅ Services data
const servicesData = {
  "web-development": {
    title: "Web Development",
    description: "Blazing-fast, scalable, and responsive web solutions tailored for your business.",
    discount: "🔥 20% OFF for first-time clients this month!",
    pricing: [
      { plan: "Basic", price: 299, tier: "basic", features: ["1 Page Website", "Basic SEO", "Hosting Setup"], timeline: "1-2 Weeks" },
      { plan: "Standard ⭐", price: 699, tier: "standard", features: ["5 Pages Website", "SEO Optimized", "Domain + Hosting"], timeline: "2-3 Weeks" },
      { plan: "Premium", price: 1299, tier: "premium", features: ["Custom Website", "E-Commerce", "Ongoing Support"], timeline: "4-6 Weeks" },
    ],
    roadmap: [
      { step: "Requirement Gathering", desc: "Understanding your business needs and goals." },
      { step: "Wireframing & Design", desc: "Visual layouts to ensure smooth user experience." },
      { step: "Development", desc: "Building your solution with clean, scalable code." },
      { step: "Testing", desc: "Rigorous testing for bugs, performance, and usability." },
      { step: "Hosting & Launch", desc: "Deploying your project live with proper support." },
    ],
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    description: "Beautiful, functional, and user-friendly interface designs for any platform.",
    discount: "💡 Free Usability Audit with Pro Plan!",
    pricing: [
      { plan: "Starter", price: 199, tier: "basic", features: ["Wireframes", "1 Platform", "Basic UI Kit"], timeline: "1 Week" },
      { plan: "Pro ⭐", price: 499, tier: "standard", features: ["Interactive Prototypes", "Cross-Platform", "Custom Components"], timeline: "2-3 Weeks" },
      { plan: "Enterprise", price: 999, tier: "premium", features: ["Full UI/UX Suite", "Research & Testing", "Ongoing Support"], timeline: "4 Weeks+" },
    ],
    roadmap: [
      { step: "Research", desc: "Study user needs, competitors, and market trends." },
      { step: "Wireframes", desc: "Create blueprint layouts for smooth navigation." },
      { step: "Prototyping", desc: "Build interactive models for real-time testing." },
      { step: "Design System", desc: "Develop complete UI kit and style guide." },
      { step: "Testing & Delivery", desc: "Validate usability and deliver final design assets." },
    ],
  },
  "poster-design": {
    title: "Poster Design",
    description: "Eye-catching posters that make your brand stand out in both digital and print formats.",
    discount: "🎨 Get 1 FREE poster when you order 3 or more!",
    pricing: [
      { plan: "Basic", price: 49, tier: "basic", features: ["1 Poster Design", "Digital Format", "2 Revisions"], timeline: "2-3 Days" },
      { plan: "Standard ⭐", price: 99, tier: "standard", features: ["5 Posters", "Print + Digital Ready", "Custom Branding"], timeline: "5-7 Days" },
      { plan: "Premium", price: 199, tier: "premium", features: ["Unlimited Posters", "Advanced Graphics", "Priority Delivery"], timeline: "1-2 Weeks" },
    ],
    roadmap: [
      { step: "Requirement Gathering", desc: "Collect theme, content, and goals for your poster." },
      { step: "Concept Sketches", desc: "Quick drafts to visualize ideas." },
      { step: "Design Draft", desc: "Develop detailed poster based on selected concept." },
      { step: "Revisions", desc: "Refine until it perfectly matches your vision." },
      { step: "Final Delivery", desc: "Provide high-quality files ready for print or digital use." },
    ],
  },
};

// Tier Colors
const tierColors = {
  basic: "from-gray-200/40 to-gray-100/20 border-gray-300/40 hover:from-gray-300/50 hover:to-gray-200/30",
  standard: "from-blue-400/40 to-blue-200/20 border-blue-300/40 hover:from-blue-500/50 hover:to-blue-300/30",
  premium: "from-yellow-400/40 to-yellow-200/20 border-yellow-300/40 hover:from-yellow-500/50 hover:to-yellow-300/30",
};

// Roadmap icons
const roadmapIcons = [FileText, LayoutDashboard, Code, Bug, Cloud, LifeBuoy];

export default function SmartEstimator() {
  const [step, setStep] = useState(1); // Step 1: Service, 2: Plan, 3: Add-ons, 4: Roadmap & Quote
  const [selectedService, setSelectedService] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [addons, setAddons] = useState([]);

  const service = servicesData[selectedService];

  const handleNext = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2 && !selectedPlan) return;
    setStep(step + 1);
  };

  const handleAddonToggle = (addon) => {
    setAddons(prev =>
      prev.includes(addon) ? prev.filter(a => a !== addon) : [...prev, addon]
    );
  };

  const calculateTotal = () => {
    if (!selectedPlan) return 0;
    const addonTotal = addons.reduce((acc, addon) => acc + parseInt(addon.match(/\d+/)[0]), 0);
    return selectedPlan.price + addonTotal;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Smart Project Estimator 🚀
        </motion.h1>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mt-4">
          Step-by-step estimator to get your project quote instantly.
        </p>

        {/* Step 1: Service */}
        {step === 1 && (
          <div className="mt-10 flex flex-col items-center">
            <select
              onChange={(e) => setSelectedService(e.target.value)}
              value={selectedService}
              className="w-full md:w-1/2 p-4 border rounded-xl shadow-md text-gray-700 font-medium"
            >
              <option value="">Select a Service</option>
              {Object.keys(servicesData).map(key => (
                <option key={key} value={key}>{servicesData[key].title}</option>
              ))}
            </select>
            {selectedService && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-4 bg-yellow-100 rounded-lg text-center shadow">
                {service.discount}
              </motion.div>
            )}
            <button
              className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              onClick={handleNext}
            >
              Next: Choose Plan
            </button>
          </div>
        )}

        {/* Step 2: Plan */}
        {step === 2 && service && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Select a Plan</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {service.pricing.map((plan, idx) => (
                <motion.div key={idx}
                  className={`p-6 rounded-2xl border shadow-md cursor-pointer transition hover:scale-105 ${selectedPlan?.plan === plan.plan ? "ring-4 ring-blue-500" : ""} bg-white`}
                  onClick={() => setSelectedPlan(plan)}
                >
                  {plan.plan.includes("⭐") && <span className="text-yellow-500 font-bold">Most Popular</span>}
                  <h3 className="text-xl font-bold mt-2">{plan.plan}</h3>
                  <p className="text-2xl font-extrabold text-blue-700 my-2">${plan.price}</p>
                  <ul className="space-y-1 text-gray-600">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" /> {f}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-sm text-gray-700 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" /> {plan.timeline}
                  </p>
                </motion.div>
              ))}
            </div>
            <button
              className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              onClick={handleNext}
            >
              Next: Add-ons
            </button>
          </div>
        )}

        {/* Step 3: Add-ons */}
        {step === 3 && selectedPlan && (
          <div className="mt-12 max-w-xl mx-auto p-6 bg-gray-50 rounded-2xl border shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Optional Add-ons</h2>
            {["Extra Page ($50)", "SEO Boost ($100)", "Maintenance ($150)"].map((addon, i) => (
              <label key={i} className="flex items-center gap-3 mb-3 cursor-pointer text-gray-700">
                <input type="checkbox" checked={addons.includes(addon)} onChange={() => handleAddonToggle(addon)} className="w-5 h-5" />
                {addon}
              </label>
            ))}
            <p className="mt-4 font-bold text-lg text-blue-700">Total Estimate: ${calculateTotal()}</p>
            <button
              className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              onClick={handleNext}
            >
              Next: Roadmap & Quote
            </button>
          </div>
        )}

        {/* Step 4: Roadmap & Quote */}
        {step === 4 && service && selectedPlan && (
          <div className="mt-12">
            <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">Roadmap & Quote 🚀</h2>
            <div className="space-y-6 max-w-3xl mx-auto">
              {service.roadmap.map((stepObj, idx) => {
                const Icon = roadmapIcons[idx % roadmapIcons.length];
                return (
                  <div key={idx} className="p-4 bg-white rounded-xl shadow-md flex items-start gap-4">
                    <div className="bg-blue-500 p-2 rounded-full">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{stepObj.step}</h3>
                      <p className="text-gray-600 text-sm">{stepObj.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <p className="text-2xl font-bold text-blue-700 mb-4">Your Total Quote: ${calculateTotal()}</p>
              <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-3xl shadow-2xl hover:from-blue-700 hover:to-cyan-600 transition">
                Get Free Quote <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
