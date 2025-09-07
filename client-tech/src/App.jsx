import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Links } from "react-router-dom";
import HomePage from "./pages/Homepage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ServicesPage from "./pages/ServicePage.jsx";
import ServiceDetailsPage from "./pages/ServiceDetailPage.jsx"; // ✅ new
import Blog from "./pages/Blog.jsx";
import Contact from "./pages/Contact.jsx";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";



export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetailsPage />} /> {/* ✅ Dynamic route */}

        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>

      <Footer />

    </>
  );
}
