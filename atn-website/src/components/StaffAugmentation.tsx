"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const benefits = [
  {
    title: "Rapid Onboarding",
    description:
      "Get developers ramped up and contributing within days, not weeks.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
  },
  {
    title: "Cost Effective",
    description:
      "Save up to 60% compared to local hiring while maintaining quality standards.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
  {
    title: "Vetted Talent",
    description:
      "Every engineer passes a rigorous technical assessment before joining your team.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
];

const technologies = [
  "React / Next.js",
  "Node.js",
  "Python / Django",
  "Flutter / Dart",
  "AWS / Azure",
  "DevOps / CI/CD",
  "React Native",
  "TypeScript",
  "AI / ML",
];

function StaffAugmentation() {
  return (
    <section id="staff-augmentation" className="section-base py-24 px-5">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Scale your team"
          title="Staff"
          titleHighlight="Augmentation"
          description="Extend your team with our top-tier developers, designers, and engineers on demand."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Why choose ATN for staff augmentation?
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Whether you need a single specialist or an entire squad, we
              provide pre-vetted, senior-level talent that integrates seamlessly
              with your existing workflow. No lengthy hiring cycles, no overhead
              — just results.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass rounded-xl p-5 flex items-start space-x-4 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {benefit.icon}
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: technologies */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white">
              Technologies we staff for
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {technologies.map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="glass rounded-xl text-center py-5 px-3 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
                >
                  <p className="text-white font-medium text-sm">{tech}</p>
                </motion.div>
              ))}
            </div>
            <a
              href="#contact"
              className="flex items-center justify-center space-x-2 bg-white text-[#0a1628] px-8 py-4 rounded-full font-medium text-base w-full hover:shadow-lg hover:shadow-white/20 transition-all duration-300 hover:-translate-y-0.5 mt-6"
            >
              <span>Hire Developers</span>
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
      </div>
    </section>
  );
}

export default memo(StaffAugmentation);
