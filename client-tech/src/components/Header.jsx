import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // Hamburger + Close icons

export const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="w-full fixed top-0 left-0 bg-blue-900 bg-opacity-50 backdrop-blur-md shadow-md z-50">
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


        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-lg font-medium text-gray-200">
          {navLinks.map((link) => (
            <motion.li
              key={link.path}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`relative ${location.pathname === link.path ? "text-blue-400" : ""
                }`}
            >
              <Link to={link.path} className="hover:cursor-pointer transition">
                {link.label}
              </Link>
              {location.pathname === link.path && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-400 rounded"
                />
              )}
            </motion.li>
          ))}
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
            <ul className="flex flex-col items-center py-6 space-y-6 text-lg font-medium text-gray-200">
              {navLinks.map((link) => (
                <motion.li
                  key={link.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-6 py-2 rounded-lg cursor-pointer ${location.pathname === link.path
                    ? "bg-blue-800 text-blue-300"
                    : "hover:bg-blue-800"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Link to={link.path}>{link.label}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
