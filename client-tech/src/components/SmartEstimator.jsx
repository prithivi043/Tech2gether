// src/pages/SmartEstimator.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Correct import
import { CheckCircle, Copy } from "lucide-react";
import { sendQuoteForm } from "../api/quoteApi";

// Format INR → USD
const formatPrice = (price) => (price / 88).toFixed(2);

// Generate Unique Client ID
const generateClientId = () =>
  "CL-" +
  Date.now().toString(36) +
  "-" +
  Math.random().toString(36).substr(2, 5).toUpperCase();

// Service Data
const servicesData = {
  "web-development": {
    title: "Web Development",
    subtitle: "High-performance, SEO-ready websites",
    discount: "🔥 20% OFF this month!",
    pricing: [
      { plan: "Basic", price: 299, features: ["1 Page Website", "Basic SEO", "Hosting Setup"], timeline: "1-2 Weeks" },
      { plan: "Standard", badge: "Most Popular", price: 699, features: ["Up to 5 Pages", "SEO Optimized", "Domain + Hosting"], timeline: "2-3 Weeks" },
      { plan: "Premium", price: 1299, features: ["Custom Website", "E-Commerce", "Ongoing Support"], timeline: "4-6 Weeks" },
    ],
    roadmap: ["Kickoff Meeting", "Wireframes & Design", "Development", "QA Testing", "Deployment"],
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    subtitle: "Human-centered, research-driven designs",
    discount: "💡 Free Usability Audit with Pro Plan!",
    pricing: [
      { plan: "Starter", price: 199, features: ["Wireframes", "1 Platform", "Basic UI Kit"], timeline: "1 Week" },
      { plan: "Pro", badge: "Best Value", price: 499, features: ["Prototypes", "Cross-Platform", "Design System"], timeline: "2-3 Weeks" },
      { plan: "Enterprise", price: 999, features: ["Research & Testing", "Design Ops", "Ongoing Support"], timeline: "4+ Weeks" },
    ],
    roadmap: ["Research", "IA & Wireframes", "Prototypes", "Design System", "User Testing"],
  },
  "poster-design": {
    title: "Poster Design",
    subtitle: "Creative posters that stand out",
    discount: "🎨 Free extra revision with Pro Plan!",
    pricing: [
      { plan: "Basic", price: 49, features: ["1 Poster", "Template Design", "1 Revision"], timeline: "1-2 Days" },
      { plan: "Pro", badge: "Popular", price: 99, features: ["3 Posters", "Custom Design", "2 Revisions"], timeline: "3-5 Days" },
      { plan: "Premium", price: 199, features: ["Unlimited Posters", "Premium Custom", "Unlimited Revisions"], timeline: "5-7 Days" },
    ],
    roadmap: ["Briefing", "Concepts", "Design", "Feedback & Revisions", "Final Delivery"],
  },
};

// Add-ons
const addonsList = [
  { id: "extra-page", name: "Extra Page", price: 50 },
  { id: "seo-boost", name: "SEO Boost", price: 100 },
  { id: "maintenance", name: "Maintenance (1 mo)", price: 150 },
  { id: "extra-poster", name: "Extra Poster", price: 30 },
  { id: "rush-delivery", name: "Rush Delivery", price: 50 },
];

export default function SmartEstimator() {
  const [step, setStep] = useState(0);
  const [clientInfo, setClientInfo] = useState({ name: "", email: "", mobile: "" });
  const [selectedService, setSelectedService] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [addons, setAddons] = useState([]);
  const [clientId] = useState(generateClientId());
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(clientId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const service = servicesData[selectedService];
  const totalEstimate = selectedPlan
    ? (selectedPlan.price + addons.reduce((acc, a) => acc + a.price, 0)) / 88
    : 0;

  const handleAddonToggle = (addon) => {
    setAddons((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const reset = () => {
    setStep(0);
    setClientInfo({ name: "", email: "", mobile: "" });
    setSelectedService("");
    setSelectedPlan(null);
    setAddons([]);
  };

  // ✅ Fixed downloadPDF using correct plugin call
  const downloadPDF = () => {
    if (!service || !selectedPlan) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Project Invoice", 14, 20);
    doc.setFontSize(12);

    // Client Info Table
    autoTable(doc, {
      startY: 30,
      head: [["Field", "Details"]],
      body: [
        ["Client ID", clientId],
        ["Name", clientInfo.name],
        ["Email", clientInfo.email],
        ["Service", service.title],
        ["Plan", `${selectedPlan.plan} - $${formatPrice(selectedPlan.price)}`],
        ["Add-ons", addons.length ? addons.map(a => `${a.name} ($${formatPrice(a.price)})`).join(", ") : "None"],
        ["Total Estimate", `$${totalEstimate.toFixed(2)}`],
      ],
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 11, cellPadding: 3 },
    });

    // Project Roadmap Table
    // if (service.roadmap?.length) {
    //   const finalY = doc.lastAutoTable.finalY + 10;
    //   doc.text("Project Roadmap:", 14, finalY);
    //   autoTable(doc, {
    //     startY: finalY + 5,
    //     head: [["Step", "Description"]],
    //     body: service.roadmap.map((s, i) => [i + 1, s]),
    //     theme: "striped",
    //   });
    // }

    doc.save(`${clientId}-${service.title}-${selectedPlan.plan}-invoice.pdf`);
  };

  const handleRequestQuote = async () => {
    if (!clientInfo.name || !clientInfo.email || !clientInfo.mobile || !service || !selectedPlan) {
      alert("Please complete all steps before requesting a quote.");
      return;
    }
    try {
      const clientId = `CL-${Math.random().toString(36).substring(2, 8)}-${Date.now().toString(36).toUpperCase()}`;
      await sendQuoteForm({
        clientId,
        ...clientInfo,
        service: service.title,
        plan: selectedPlan.plan,
        budget: totalEstimate.toFixed(2),
        message: `Add-ons: ${addons.length ? addons.map((a) => a.name).join(", ") : "None"}`,
      });
      alert("✅ Quote request sent!");
      reset();
    } catch (err) {
      console.error("Error sending quote:", err);
      alert("❌ Failed to send quote.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-10 bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl shadow-2xl py-26">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:justify-between items-center mb-10 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl shadow-xl border border-gray-100 gap-6">
        {/* Left Section */}
        <div className="flex flex-col gap-2 md:gap-3">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-600 tracking-tight">
            Smart Project Estimator
          </h2>
          <p className="text-gray-700 md:text-lg">
            Instant pricing & roadmap. Get your tailored project quote in 3 steps.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Client ID Card */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-3 bg-white rounded-2xl shadow-lg border border-indigo-200 cursor-pointer relative"
          >
            <span className="text-xs text-gray-500">Client ID:</span>
            <span className="font-mono font-bold text-indigo-700">{clientId}</span>
            <Copy className="w-4 h-4 text-indigo-600" />

            {/* Copied Tooltip */}
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: -10 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-lg shadow-md"
              >
                <CheckCircle className="inline w-3 h-3 mr-1" /> Copied!
              </motion.div>
            )}
          </motion.div>

          {/* Reset Button */}
          <motion.button
            onClick={reset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-2 px-5 py-2 bg-white border border-indigo-300 rounded-xl text-sm font-medium shadow-md hover:bg-indigo-50 hover:shadow-lg transition"
          >
            <Copy className="w-4 h-4 text-indigo-600" />
            Reset
          </motion.button>
        </div>
      </header>




      {/* Stepper */}
      {/* Professional Stepper */}
      <div className="relative mb-10">
        <div className="absolute top-6 left-6 right-6 h-1 bg-gray-300 rounded z-0">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded"
          />
        </div>

        <div className="flex justify-between relative z-10">
          {["Client Info", "Service", "Plan", "Quote"].map((label, i) => (
            <div key={i} className="flex flex-col items-center relative">
              <motion.div
                whileHover={{ scale: 1.15 }}
                className={`w-14 h-14 rounded-full flex items-center justify-center font-bold shadow-xl transition-all duration-300 ${step === i
                  ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white ring-4 ring-indigo-300"
                  : step > i
                    ? "bg-gradient-to-br from-indigo-400 to-purple-400 text-white"
                    : "bg-gray-200 text-gray-600"
                  }`}
              >
                {i + 1}
              </motion.div>
              <div
                className={`mt-2 text-sm font-semibold text-center transition-colors duration-300 ${step >= i ? "text-indigo-700" : "text-gray-500"
                  }`}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>



      {/* Steps */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2">
          <AnimatePresence mode="wait">
            {/* Step 0 */}
            {step === 0 && (
              <motion.div
                key="s0"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white border rounded-3xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-6 text-indigo-700">1. Enter Your Information</h3>

                <div className="flex flex-col gap-4">
                  {/* Name Input */}
                  <div className="flex flex-col">
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={clientInfo.name}
                      onChange={(e) =>
                        setClientInfo({ ...clientInfo, name: e.target.value })
                      }
                      className={`border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-indigo-500 transition ${clientInfo.name && clientInfo.name.length < 3 ? "border-red-400" : ""
                        }`}
                    />
                    {clientInfo.name && clientInfo.name.length < 3 && (
                      <span className="text-red-500 text-sm mt-1">
                        Name must be at least 3 characters
                      </span>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col">
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={clientInfo.email}
                      onChange={(e) =>
                        setClientInfo({ ...clientInfo, email: e.target.value })
                      }
                      className={`border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-indigo-500 transition ${clientInfo.email && !/^\S+@\S+\.\S+$/.test(clientInfo.email)
                        ? "border-red-400"
                        : ""
                        }`}
                    />
                    {clientInfo.email && !/^\S+@\S+\.\S+$/.test(clientInfo.email) && (
                      <span className="text-red-500 text-sm mt-1">
                        Enter a valid email address
                      </span>
                    )}
                  </div>

                  {/* Mobile Input */}
                  <div className="flex flex-col">
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={clientInfo.mobile}
                      onChange={(e) =>
                        setClientInfo({ ...clientInfo, mobile: e.target.value })
                      }
                      className={`border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-indigo-500 transition ${clientInfo.mobile && !/^\+?\d{10,15}$/.test(clientInfo.mobile)
                        ? "border-red-400"
                        : ""
                        }`}
                    />
                    {clientInfo.mobile && !/^\+?\d{10,15}$/.test(clientInfo.mobile) && (
                      <span className="text-red-500 text-sm mt-1">
                        Enter a valid phone number
                      </span>
                    )}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => setStep(1)}
                    disabled={
                      !clientInfo.name ||
                      clientInfo.name.length < 3 ||
                      !clientInfo.email ||
                      !/^\S+@\S+\.\S+$/.test(clientInfo.email) ||
                      !clientInfo.mobile ||
                      !/^\+?\d{10,15}$/.test(clientInfo.mobile)
                    }
                    className={`mt-4 w-full px-6 py-3 rounded-lg font-semibold text-white transition ${!clientInfo.name ||
                      clientInfo.name.length < 3 ||
                      !clientInfo.email ||
                      !/^\S+@\S+\.\S+$/.test(clientInfo.email) ||
                      !clientInfo.mobile ||
                      !/^\+?\d{10,15}$/.test(clientInfo.mobile)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90"
                      }`}
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}


            {/* Step 1 */}
            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white border rounded-3xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-6 text-indigo-700">2. Select a Service</h3>

                <div className="grid md:grid-cols-3 gap-6">
                  {Object.keys(servicesData).map((key) => {
                    const service = servicesData[key];
                    return (
                      <motion.div
                        key={key}
                        whileHover={{ scale: 1.04 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={() => setSelectedService(key)}
                        className={`relative cursor-pointer border rounded-2xl p-6 transition
              ${selectedService === key ? "border-indigo-600 shadow-2xl bg-indigo-50" : "border-gray-200 hover:shadow-md"}
            `}
                      >
                        {/* Service Title */}
                        <h4 className="text-lg font-bold text-gray-800">{service.title}</h4>

                        {/* Subtitle */}
                        <p className="text-gray-500 mt-1 text-sm">{service.subtitle}</p>

                        {/* Discount */}
                        {service.discount && (
                          <span className="text-xs text-indigo-600 mt-3 block font-semibold">
                            {service.discount}
                          </span>
                        )}

                        {/* Highlight Selected Service */}
                        {selectedService === key && (
                          <motion.div
                            layoutId="selected-service"
                            className="absolute inset-0 border-2 border-indigo-600 rounded-2xl pointer-events-none"
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setStep(0)}
                    className="px-6 py-3 border rounded-lg hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90"
                    disabled={!selectedService}
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}





            {/* Step 2 */}
            {step === 2 && service && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white border rounded-3xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-6 text-indigo-700">3. Select a Plan</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {service.pricing.map((plan) => (
                    <motion.div
                      key={plan.plan}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => setSelectedPlan(plan)}
                      className={`cursor-pointer border rounded-2xl p-6 transition ${selectedPlan?.plan === plan.plan ? "border-indigo-600 shadow-xl bg-indigo-50" : "border-gray-200 hover:shadow-md"
                        }`}
                    >
                      {plan.badge && <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full text-xs">{plan.badge}</span>}
                      <h4 className="text-lg font-bold mt-2 text-gray-800">{plan.plan}</h4>
                      <p className="text-indigo-700 mt-1 text-xl font-semibold">${formatPrice(plan.price)}</p>
                      <ul className="text-gray-500 mt-2 text-sm space-y-1">
                        {plan.features.map((f) => (
                          <li key={f}>✔ {f}</li>
                        ))}
                      </ul>
                      <p className="mt-2 text-xs text-gray-500">Timeline: {plan.timeline}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Add-ons */}
                <h4 className="text-xl font-semibold mt-8 mb-4">Optional Add-ons</h4>
                <div className="flex flex-wrap gap-4">
                  {addonsList.map((addon) => (
                    <button
                      key={addon.id}
                      onClick={() => handleAddonToggle(addon)}
                      className={`px-4 py-2 border rounded-lg text-sm ${addons.some((a) => a.id === addon.id)
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                        : "bg-white border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                      {addon.name} +${formatPrice(addon.price)}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-6">
                  <button onClick={() => setStep(1)} className="px-6 py-3 border rounded-lg hover:bg-gray-50">
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90"
                    disabled={!selectedPlan}
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3 */}
            {step === 3 && service && selectedPlan && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white border rounded-3xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-6 text-indigo-700">4. Your Project Quote</h3>
                <div className="space-y-4">
                  <div className="flex justify-between"><span>Plan:</span><span className="font-semibold">{selectedPlan.plan}</span></div>
                  <div className="flex justify-between"><span>Price:</span><span className="font-semibold">${formatPrice(selectedPlan.price)}</span></div>
                  {addons.map((a) => (
                    <div key={a.id} className="flex justify-between">
                      <span>{a.name}</span>
                      <span className="font-semibold">+${formatPrice(a.price)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between border-t pt-4 text-lg font-bold">
                    <span>Total Estimate</span>
                    <span>${totalEstimate.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => setStep(0)}
                    className="px-6 py-3 border rounded-lg hover:bg-gray-50"
                  >
                    Back
                  </button>
                </div>

                {/* Roadmap */}
                <h4 className="text-xl font-semibold mt-8 mb-4">Project Roadmap</h4>
                <ol className="list-decimal pl-6 text-gray-600 space-y-2">
                  {service.roadmap.map((s, i) => <li key={i}>{s}</li>)}
                </ol>

                {/* Actions */}
                <div className="flex flex-col md:flex-row gap-4 mt-6">
                  <button onClick={downloadPDF} className="flex-1 bg-white border px-6 py-3 rounded-lg hover:bg-gray-50">
                    Download PDF
                  </button>
                  <button onClick={handleRequestQuote} className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:opacity-90">
                    Request Quote
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between">
          {/* Progress Tracker */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Your Progress</h3>
            <ul className="space-y-4">
              {["Client Info", "Service", "Plan & Add-ons", "Quote"].map((label, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
                  onClick={() => setStep(i)} // Allow users to jump to any step
                >
                  <motion.div
                    animate={{ scale: step === i ? 1.2 : 1 }}
                    transition={{ duration: 0.3 }}
                    className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${step >= i ? "border-green-300 bg-green-400 text-white" : "border-gray-400 text-gray-400"
                      }`}
                  >
                    {step > i ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </motion.div>
                  <span className={`font-medium ${step === i ? "text-white" : "text-gray-200"}`}>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Plan Summary & Estimate */}
          {selectedPlan && (
            <div className="bg-white text-indigo-700 p-6 rounded-2xl mt-10 shadow-lg">
              <h4 className="text-lg font-bold mb-2">Selected Plan</h4>
              <p className="font-semibold">{selectedPlan.plan}</p>
              <div className="mt-2">
                <h4 className="text-lg font-bold mb-2">Add-ons</h4>
                {addons.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-600">
                    {addons.map((a) => (
                      <li key={a.id}>{a.name} (+${formatPrice(a.price)})</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm">No add-ons selected</p>
                )}
              </div>
              <div className="mt-4 border-t pt-4 text-lg font-bold flex justify-between items-center">
                <span>Total Estimate</span>
                <span>${totalEstimate.toFixed(2)}</span>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={downloadPDF}
                  className="flex-1 bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  Download PDF
                </button>
                <button
                  onClick={handleRequestQuote}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:opacity-90"
                >
                  Request Quote
                </button>
              </div>
            </div>
          )}

          {/* Optional Mini Roadmap */}
          {service && (
            <div className="mt-8">
              <h4 className="text-white font-bold mb-2">Roadmap</h4>
              <ul className="space-y-2">
                {service.roadmap.map((stepLabel, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <span
                      className={`w-3 h-3 rounded-full ${idx <= step ? "bg-green-300" : "bg-gray-400"
                        }`}
                    ></span>
                    <span className={idx <= step ? "text-white" : "text-gray-200"}>{stepLabel}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
