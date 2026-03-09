"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Our Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Staff Augmentation", href: "#staff-augmentation" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4"
    >
      <div
        className={`max-w-7xl mx-auto rounded-full px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "glass-strong" : "glass"
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#0a1628]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <span className="text-lg font-bold tracking-wider text-white">
              ATN
            </span>
            <span className="block text-[8px] text-gray-400 tracking-widest uppercase">
              Alpine Technology Network
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8 text-sm">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          <button className="hidden sm:flex items-center space-x-1 text-sm text-gray-300 hover:text-white transition">
            <span>EN</span>
            <img
              src="https://flagcdn.com/w20/us.png"
              alt="US"
              className="w-5 h-3 rounded-sm"
            />
          </button>
          <a
            href="#contact"
            className="hidden sm:flex bg-white text-[#0a1628] px-5 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-white/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            Apply Now
          </a>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white p-1"
            onClick={toggleMobile}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mt-2 mx-2 glass-strong rounded-2xl p-6 space-y-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobile}
                className="block text-gray-300 hover:text-white transition text-sm py-1"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMobile}
              className="block bg-white text-[#0a1628] px-5 py-3 rounded-full text-sm font-medium text-center mt-4"
            >
              Apply Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default memo(Navbar);
