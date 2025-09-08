import React from "react";
import SmartEstimator from "../components/SmartEstimator";

export default function CostCalculatorPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center px-6 py-16 overflow-hidden">

      {/* Decorative Background Shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-200 rounded-full opacity-20 -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-200 rounded-full opacity-25 -z-10" />

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mb-12 gap-12 py-26">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-4 leading-tight">
            Website Cost Calculator 💻
          </h1>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            Instantly estimate your dream website. Select the service type,
            add optional features, and get a personalized quote within minutes.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/calculator-illustration.svg"
            alt="Website Calculator Illustration"
            className="w-3/4 md:w-full animate-float"
          />
        </div>
      </div>

      {/* Calculator Card */}
      <div className="w-full max-w-4xl bg-white backdrop-blur-md bg-opacity-80 shadow-2xl rounded-3xl p-10 transition-transform transform hover:-translate-y-3 hover:shadow-3xl">
        <SmartEstimator />
      </div>

      {/* Extra Call to Action */}
      <div className="mt-12 text-center max-w-xl">
        <p className="text-gray-700 text-lg md:text-base">
          Unsure about what you need?{' '}
          <a
            href="/contact"
            className="text-blue-600 font-semibold hover:text-blue-800 hover:underline transition-colors"
          >
            Talk to our experts →
          </a>
        </p>
      </div>

      {/* Optional Trust Section */}
      <div className="mt-16 flex flex-wrap justify-center gap-8">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <img src="/trusted-icon.svg" alt="Trusted Icon" className="w-6 h-6" />
          <span>Trusted by 120+ companies</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <img src="/fast-icon.svg" alt="Fast Delivery Icon" className="w-6 h-6" />
          <span>Average delivery 10-20 days</span>
        </div>
      </div>
    </div>
  );
}
