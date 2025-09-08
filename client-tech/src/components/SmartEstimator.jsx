import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import { CheckCircle, Copy, Stars } from "lucide-react";
import { sendQuoteForm } from "../api/quoteApi";

// Generate Unique Client ID
const generateClientId = () =>
  "CL-" + Date.now().toString(36) + "-" + Math.random().toString(36).substr(2, 5).toUpperCase();

// Services Data
const servicesData = {
  "web-development": {
    title: "Web Development",
    subtitle: "Fast, secure & SEO-friendly websites",
    discount: "🔥 20% OFF this month!",
    pricing: [
      { plan: "Basic", price: 299, features: ["1 Page Website", "Basic SEO", "Hosting Setup"], timeline: "1-2 Weeks" },
      { plan: "Standard", badge: "Popular", price: 699, features: ["Up to 5 Pages", "SEO Optimized", "Domain + Hosting"], timeline: "2-3 Weeks" },
      { plan: "Premium", price: 1299, features: ["Custom Website", "E-Commerce", "Ongoing Support"], timeline: "4-6 Weeks" },
    ],
    roadmap: [
      "Kickoff & Requirement Gathering",
      "Wireframes & Visual Design",
      "Development & Integrations",
      "Testing, QA & Optimizations",
      "Deployment & Handover",
    ],
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    subtitle: "Human-centered product design",
    discount: "💡 Free Usability Audit with Pro Plan!",
    pricing: [
      { plan: "Starter", price: 199, features: ["Wireframes", "1 Platform", "Basic UI Kit"], timeline: "1 Week" },
      { plan: "Pro", badge: "Best Value", price: 499, features: ["Interactive Prototypes", "Cross-Platform", "Design System"], timeline: "2-3 Weeks" },
      { plan: "Enterprise", price: 999, features: ["Research & Testing", "Design Ops", "Ongoing Support"], timeline: "4+ Weeks" },
    ],
    roadmap: [
      "User Research",
      "Information Architecture",
      "Wireframes & Prototypes",
      "Design System",
      "Usability Testing & Delivery",
    ],
  },
  "poster-design": {
    title: "Poster Design",
    subtitle: "Eye-catching, professional posters",
    discount: "🎨 Free 1 Revision on Pro Plan!",
    pricing: [
      { plan: "Basic", price: 49, features: ["Single Poster", "Standard Template", "1 Revision"], timeline: "1-2 Days" },
      { plan: "Pro", badge: "Popular", price: 99, features: ["Up to 3 Posters", "Custom Design", "2 Revisions"], timeline: "3-5 Days" },
      { plan: "Premium", price: 199, features: ["Unlimited Posters", "Premium Custom Design", "Unlimited Revisions"], timeline: "5-7 Days" },
    ],
    roadmap: [
      "Requirement Gathering",
      "Concept & Sketch",
      "Design & Draft",
      "Client Review & Revisions",
      "Final Delivery",
    ],
  },
};

// Add-ons List
const addonsList = [
  { id: "extra-page", name: "Extra Page", price: 50 },
  { id: "seo-boost", name: "SEO Boost", price: 100 },
  { id: "maintenance", name: "Maintenance (1 mo)", price: 150 },
  { id: "extra-poster", name: "Extra Poster", price: 30 },
  { id: "rush-delivery", name: "Rush Delivery", price: 50 },
];

export default function SmartEstimator() {
  // States
  const [step, setStep] = useState(0);
  const [clientInfo, setClientInfo] = useState({ name: "", email: "", mobile: "" });
  const [selectedService, setSelectedService] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [addons, setAddons] = useState([]);
  const [clientId] = useState(generateClientId());

  const service = servicesData[selectedService];
  const totalEstimate = selectedPlan
    ? selectedPlan.price + addons.reduce((acc, a) => acc + a.price, 0)
    : 0;

  // Toggle Add-ons
  const handleAddonToggle = (addon) => {
    setAddons((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  // Reset Form
  const reset = () => {
    setStep(0);
    setClientInfo({ name: "", email: "", mobile: "" });
    setSelectedService("");
    setSelectedPlan(null);
    setAddons([]);
  };

  // Download PDF
  const downloadPDF = () => {
    if (!service || !selectedPlan) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Project Quote", 14, 20);

    doc.setFontSize(12);
    doc.text(`Client ID: ${clientId}`, 14, 35);
    doc.text(`Name: ${clientInfo.name}`, 14, 45);
    doc.text(`Email: ${clientInfo.email}`, 14, 55);
    doc.text(`Mobile: ${clientInfo.mobile}`, 14, 65);
    doc.text(`Service: ${service.title}`, 14, 75);
    doc.text(`Plan: ${selectedPlan.plan} - $${selectedPlan.price}`, 14, 85);

    doc.text("Add-ons:", 14, 95);
    if (addons.length) {
      addons.forEach((a, i) => doc.text(`- ${a.name} ($${a.price})`, 20, 105 + i * 10));
    } else {
      doc.text("None", 20, 105);
    }

    doc.text(`Total Estimate: $${totalEstimate}`, 14, 130);

    doc.text("Roadmap:", 14, 150);
    service.roadmap.forEach((s, i) => {
      doc.text(`${i + 1}. ${s}`, 20, 160 + i * 10);
    });

    doc.save(`${clientId}-${service.title}-${selectedPlan.plan}-quote.pdf`);
  };

  // Request Quote
  const handleRequestQuote = async () => {
    if (!clientInfo.name || !clientInfo.email || !clientInfo.mobile || !service || !selectedPlan) {
      alert("Please complete all steps before requesting a quote.");
      return;
    }

    const formData = {
      clientId,
      name: clientInfo.name,
      email: clientInfo.email,
      mobile: clientInfo.mobile,
      service: service.title,
      plan: selectedPlan.plan,
      budget: totalEstimate,
      message: `Selected Add-ons: ${addons.length ? addons.map((a) => a.name).join(", ") : "None"}`,
    };

    try {
      await sendQuoteForm(formData);
      alert("✅ Quote request sent successfully!");
      reset();
    } catch (error) {
      alert("❌ Failed to send quote. Try again.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-3xl shadow-2xl py-26">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:justify-between mb-10 gap-4">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900">Smart Project Estimator</h2>
          <p className="text-gray-500 mt-2">Transparent pricing, instant roadmap — get a quote in 3 easy steps.</p>
          <p className="text-sm text-gray-400 mt-1">
            Client ID: <span className="font-mono font-semibold text-indigo-600">{clientId}</span>
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="bg-white border rounded-xl px-5 py-3 flex items-center gap-2 shadow-md">
            <Stars className="w-6 h-6 text-yellow-400" />
            <div className="text-sm">
              <div className="font-semibold text-gray-800">Trusted by 120+ clients</div>
              <div className="text-gray-400">Avg. delivery 10-20 days</div>
            </div>
          </div>
          <button onClick={reset} className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm shadow-md hover:bg-gray-50">
            <Copy className="w-4 h-4" /> Reset
          </button>
        </div>
      </header>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-10">
        {["Client Info", "Service", "Plan", "Quote"].map((label, i) => (
          <div key={i} className="flex-1 flex flex-col items-center relative">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${step >= i ? "bg-indigo-600" : "bg-gray-300"}`}>
              {i + 1}
            </div>
            <div className="mt-2 text-sm text-gray-600">{label}</div>
            {i < 3 && <div className="absolute top-6 right-[-50%] w-full h-1 bg-gray-200 z-0" />}
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <AnimatePresence mode="wait">
            {/* Step 0: Client Info */}
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white border rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-semibold mb-6">1. Enter Your Information</h3>
                <div className="flex flex-col gap-4">
                  <input type="text" placeholder="Full Name" value={clientInfo.name} onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })} className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-indigo-500" />
                  <input type="email" placeholder="Email" value={clientInfo.email} onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })} className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-indigo-500" />
                  <input type="tel" placeholder="Mobile Number" value={clientInfo.mobile} onChange={(e) => setClientInfo({ ...clientInfo, mobile: e.target.value })} className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-indigo-500" />
                  <button onClick={() => setStep(1)} className="mt-4 w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">Next</button>
                </div>
              </motion.div>
            )}

            {/* Step 1: Service */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white border rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-semibold mb-6">2. Select a Service</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {Object.keys(servicesData).map((key) => (
                    <div key={key} onClick={() => setSelectedService(key)} className={`cursor-pointer border rounded-2xl p-6 hover:shadow-lg transition ${selectedService === key ? "border-indigo-600 shadow-lg" : "border-gray-200"}`}>
                      <h4 className="text-lg font-bold">{servicesData[key].title}</h4>
                      <p className="text-gray-500 mt-1">{servicesData[key].subtitle}</p>
                      <span className="text-sm text-indigo-600 mt-2 block">{servicesData[key].discount}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <button onClick={() => setStep(0)} className="px-6 py-3 border rounded-lg hover:bg-gray-50">Back</button>
                  <button onClick={() => setStep(2)} className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700" disabled={!selectedService}>Next</button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Plan & Add-ons */}
            {step === 2 && service && (
              <motion.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white border rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-semibold mb-6">3. Select a Plan</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {service.pricing.map((plan) => (
                    <div key={plan.plan} onClick={() => setSelectedPlan(plan)} className={`cursor-pointer border rounded-2xl p-6 hover:shadow-lg transition ${selectedPlan?.plan === plan.plan ? "border-indigo-600 shadow-lg" : "border-gray-200"}`}>
                      {plan.badge && <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full text-xs">{plan.badge}</span>}
                      <h4 className="text-lg font-bold mt-2">{plan.plan}</h4>
                      <p className="text-gray-500 mt-1">${plan.price}</p>
                      <ul className="text-gray-400 mt-2 text-sm space-y-1">{plan.features.map((f) => <li key={f}>{f}</li>)}</ul>
                      <p className="mt-2 text-xs text-gray-500">Timeline: {plan.timeline}</p>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-semibold mt-8 mb-4">Optional Add-ons</h4>
                <div className="flex flex-wrap gap-4">
                  {addonsList.map((addon) => (
                    <button key={addon.id} onClick={() => handleAddonToggle(addon)} className={`px-4 py-2 border rounded-lg text-sm ${addons.some((a) => a.id === addon.id) ? "bg-indigo-600 text-white border-indigo-600" : "bg-white border-gray-300 hover:bg-gray-50"}`}>
                      {addon.name} +${addon.price}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-6">
                  <button onClick={() => setStep(1)} className="px-6 py-3 border rounded-lg hover:bg-gray-50">Back</button>
                  <button onClick={() => setStep(3)} className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700" disabled={!selectedPlan}>Next</button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Quote */}
            {step === 3 && service && selectedPlan && (
              <motion.div key="s3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white border rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-semibold mb-6">4. Quote Summary</h3>
                <div className="space-y-4">
                  <p><span className="font-semibold">Service:</span> {service.title}</p>
                  <p><span className="font-semibold">Plan:</span> {selectedPlan.plan} (${selectedPlan.price})</p>
                  <p><span className="font-semibold">Add-ons:</span> {addons.length ? addons.map((a) => `${a.name} ($${a.price})`).join(", ") : "None"}</p>
                  <p className="text-lg font-bold">Total Estimate: ${totalEstimate}</p>

                  <button onClick={downloadPDF} className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">Download PDF</button>
                  <button onClick={handleRequestQuote} className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Request Quote</button>
                  <button onClick={() => setStep(2)} className="mt-4 px-6 py-3 border rounded-lg hover:bg-gray-50">Back</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Quote Sidebar */}
        <div className="hidden md:block bg-indigo-50 border border-indigo-100 p-6 rounded-2xl shadow-inner">
          <h4 className="font-semibold text-lg mb-4">Quick Quote</h4>
          <div className="text-gray-700 space-y-2">
            <p><span className="font-semibold">Service:</span> {service?.title || "-"}</p>
            <p><span className="font-semibold">Plan:</span> {selectedPlan?.plan || "-"}</p>
            <p><span className="font-semibold">Add-ons:</span> {addons.length ? addons.map((a) => a.name).join(", ") : "-"}</p>
            <p className="text-lg font-bold mt-2">Total: ${totalEstimate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
