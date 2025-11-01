// src/pages/ServiceDetailsPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const serviceDetails = {
  "web-development": {
    title: "Web Development",
    description:
      "We design and develop modern, responsive, and scalable websites. From landing pages to enterprise-grade applications, our web solutions are built to perform.",
    features: [
      "Responsive Design",
      "SEO Optimization",
      "Secure & Scalable",
      "E-commerce Ready",
    ],
    pricing: [
      {
        plan: "Starter",
        price: 299,
        originalPrice: 799,
        features: [
          "Up to 3 Pages",
          "Basic Website Design",
          "Mobile Responsive",
          "1-Month Free Support",
          "Hosting & Domain Guidance",
        ],
      },
      {
        plan: "Professional",
        price: 499,
        originalPrice: 1299,
        features: [
          "Up to 7 Pages",
          "Custom Design",
          "Advanced Integrations",
          "SEO Optimized",
          "3-Month Free Support",
          "Free SSL Setup",
          "CMS Integration (WordPress/React)",
        ],
      },
      {
        plan: "Enterprise",
        price: 799,
        originalPrice: 1999,
        features: [
          "Unlimited Pages",
          "Fully Custom Solution",
          "E-commerce Integration",
          "High Performance Optimization",
          "6-Month Free Support",
          "Free Hosting Setup",
          "Admin Dashboard",
          "24/7 Priority Support",
        ],
      },
    ],
  },
  "poster-design": {
    title: "Poster Design",
    description:
      "Get visually stunning posters that capture attention. Perfect for campaigns, events, and businesses.",
    features: [
      "Custom creative designs",
      "High-resolution exports",
      "Brand consistency",
      "Fast delivery",
    ],
    pricing: [
      {
        plan: "Basic",
        price: 79,
        originalPrice: 199,
        features: ["1 Poster", "High-resolution", "3 Revisions"],
      },
      {
        plan: "Standard",
        price: 150,
        originalPrice: 399,
        features: ["3 Posters", "Custom illustrations", "5 Revisions"],
      },
      {
        plan: "Premium",
        price: 299,
        originalPrice: 799,
        features: [
          "Unlimited Posters (Monthly)",
          "Priority support",
          "Unlimited revisions",
        ],
      },
    ],
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    description:
      "We create elegant and user-friendly designs for websites and mobile apps, ensuring seamless experiences for your customers.",
    features: [
      "Wireframes & Prototypes",
      "Custom UI Kits",
      "User Research & Testing",
      "Responsive Layouts",
    ],
    pricing: [
      {
        plan: "Starter",
        price: 199,
        originalPrice: 499,
        features: ["Basic UI Design", "Mobile-first approach", "2 Revisions"],
      },
      {
        plan: "Professional",
        price: 349,
        originalPrice: 899,
        features: [
          "Full UI/UX Package",
          "Custom components",
          "User flow analysis",
          "5 Revisions",
        ],
      },
      {
        plan: "Premium",
        price: 499,
        originalPrice: 1299,
        features: [
          "End-to-End UX Research",
          "High fidelity prototypes",
          "Design system",
          "Unlimited revisions",
        ],
      },
    ],
  },
};

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const service = serviceDetails[id];

  if (!service) {
    return (
      <div className="text-center py-20 text-gray-600">Service not found</div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-16 px-6 lg:px-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          {service.title}
        </h1>
        <p className="text-lg text-gray-700 mb-10 leading-relaxed">
          {service.description}
        </p>
      </motion.div>

      {/* Features */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Why Choose Us?
          </h2>
          <ul className="space-y-4">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-center text-gray-700">
                <CheckCircle className="w-6 h-6 text-cyan-500 mr-3" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <motion.div
          className="rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 shadow-lg p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Transform Your Business
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Partner with us to create solutions that drive engagement, revenue,
            and growth. Our team blends creativity with technical excellence to
            deliver results.
          </p>
        </motion.div>
      </div>

      {/* Pricing Section */}
      <section id="offers" className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Our Pricing Plans
        </h2>
        <div className="grid gap-10 md:grid-cols-3">
          {service.pricing.map((plan, i) => {
            const discount =
              Math.round(
                ((plan.originalPrice - plan.price) / plan.originalPrice) * 100
              ) || 0;
            return (
              <motion.div
                key={plan.plan}
                className={`rounded-2xl shadow-xl border p-8 flex flex-col relative overflow-hidden ${i === 1
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white scale-105"
                    : "bg-white"
                  }`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
              >
                {/* Discount Badge */}
                {discount > 0 && (
                  <span
                    className={`absolute top-4 right-4 text-sm font-semibold px-3 py-1 rounded-full ${i === 1
                        ? "bg-white text-cyan-600"
                        : "bg-cyan-100 text-cyan-600"
                      }`}
                  >
                    {discount}% OFF
                  </span>
                )}

                {/* Plan Name */}
                <h3 className="text-2xl font-bold mb-2">{plan.plan}</h3>

                {/* Price */}
                <div className="mb-6">
                  <p className="text-4xl font-extrabold">
                    ₹{plan.price.toLocaleString()}
                  </p>
                  <p
                    className={`text-sm mt-1 ${i === 1 ? "text-gray-200" : "text-gray-500"
                      } line-through`}
                  >
                    ₹{plan.originalPrice.toLocaleString()}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center">
                      <CheckCircle
                        className={`w-5 h-5 mr-2 ${i === 1 ? "text-white" : "text-cyan-500"
                          }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  className={`w-full font-semibold py-3 rounded-xl shadow-md transition ${i === 1
                      ? "bg-white text-cyan-600 hover:bg-gray-100"
                      : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700"
                    }`}
                >
                  Choose {plan.plan}
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
