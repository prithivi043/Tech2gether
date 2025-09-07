import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

export const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
  ];

  const servicesList = [
    { path: "/services", label: "Services" },
    { path: "/services/web-development", label: "Web Development" },
    { path: "/services/poster-design", label: "Poster Design" },
    { path: "/services/ui-ux-design", label: "UI/UX Design" },
  ];

  return (
    <header className="w-full fixed top-0 left-0 bg-blue-900 bg-opacity-70 backdrop-blur-md shadow-md z-50">
      <nav className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <motion.h1
          className="text-3xl font-bold italic tracking-tight text-white font-sans"
          whileHover={{ scale: 1.1 }}
        >
          <Link to="/" className="hover:cursor-pointer">
            Tech<span className="text-blue-400">2gether</span>
          </Link>
        </motion.h1>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 text-lg font-medium text-gray-200">
          {navLinks.map((link) => {
            if (link.label === "Services") {
              return (
                <li key={link.path} className="relative">
                  <button
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    className={`flex items-center gap-1 transition ${location.pathname.includes("/services") ? "text-blue-400" : ""
                      }`}
                  >
                    {link.label} <ChevronDown className="w-4 h-4" />
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-blue-950 rounded-lg shadow-lg text-gray-200 overflow-hidden z-50"
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                      >
                        {servicesList.map((service) => (
                          <li key={service.path} className="px-4 py-2 hover:bg-blue-800 transition">
                            <Link
                              to={service.path}
                              className={`block w-full ${location.pathname === service.path ? "text-blue-400 font-semibold" : ""
                                }`}
                            >
                              {service.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            }

            return (
              <li
                key={link.path}
                className={`relative ${location.pathname === link.path ? "text-blue-400" : ""
                  }`}
              >
                <Link to={link.path} className="hover:cursor-pointer transition">
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-16 left-0 w-full bg-blue-950 bg-opacity-95 shadow-lg rounded-b-2xl"
          >
            <ul className="flex flex-col items-center py-6 space-y-4 text-lg font-medium text-gray-200">
              {navLinks.map((link) => {
                if (link.label === "Services") {
                  return (
                    <li key={link.path} className="w-full px-6">
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className="flex justify-between w-full px-4 py-2 bg-blue-900 rounded-lg items-center"
                      >
                        {link.label} <ChevronDown className="w-4 h-4" />
                      </button>
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col mt-2 bg-blue-800 rounded-lg overflow-hidden"
                          >
                            {servicesList.map((service) => (
                              <li
                                key={service.path}
                                className={`px-4 py-2 hover:bg-blue-700 transition ${location.pathname === service.path ? "text-blue-400 font-semibold" : ""
                                  }`}
                                onClick={() => setIsOpen(false)}
                              >
                                <Link to={service.path}>{service.label}</Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }

                return (
                  <li key={link.path} className="w-full px-6" onClick={() => setIsOpen(false)}>
                    <Link
                      to={link.path}
                      className={`block px-4 py-2 rounded-lg hover:bg-blue-800 transition ${location.pathname === link.path ? "text-blue-400 font-semibold" : ""
                        }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
