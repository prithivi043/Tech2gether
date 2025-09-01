import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-sky-500 to-blue-800 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Tech-Together</h2>
          <p className="text-sm opacity-80 leading-relaxed">
            Building bridges through technology and innovation.
            Together, we shape the future.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/services" className="hover:underline">Services</Link></li>
            <li><Link to="/blog" className="hover:underline">Blog</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-5">
            <a href="#" className="hover:text-sky-300 transition">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-sky-300 transition">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:text-sky-300 transition">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="hover:text-sky-300 transition">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sky-300 mt-10 pt-5 text-center text-sm opacity-80">
        © {new Date().getFullYear()} Tech-Together. All Rights Reserved.
      </div>
    </footer>
  );
};
