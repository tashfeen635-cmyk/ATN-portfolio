"use client";

import { memo } from "react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero - Custom Software Development Company"
      className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-5"
    >
      {/* Radial overlay to blend with globe */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,22,40,0.3)_50%,rgba(10,22,40,0.65)_100%)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto space-y-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2"
        >
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="text-sm text-gray-200">
            We make digital (and magical)...
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight glow-text"
        >
          <span className="text-white">Custom Software Development</span>
          <span className="text-gray-200"> to Help Companies</span>
          <br />
          <span className="text-white">Scale with World-Class Technology</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          We design, develop, and deliver comprehensive software, prioritizing
          user experience, engagement, and intelligent solutions for diverse
          platforms.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <a
            href="#about"
            className="bg-white text-[#0a1628] px-8 py-4 rounded-full font-medium flex items-center space-x-2 text-base hover:shadow-lg hover:shadow-white/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>About Us</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </a>
          <a
            href="#contact"
            className="border border-white/30 px-8 py-4 rounded-full font-medium flex items-center space-x-2 text-base hover:bg-white/10 hover:border-white/50 transition-all duration-300"
          >
            <span>Contact Us</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Hero);
