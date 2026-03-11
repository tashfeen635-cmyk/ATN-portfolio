"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const stats = [
  { number: "50+", label: "Projects Delivered" },
  { number: "30+", label: "Happy Clients" },
  { number: "5+", label: "Years Experience" },
  { number: "20+", label: "Team Members" },
];

function AboutSection() {
  return (
    <section id="about" aria-label="About Alpine Technology Network" className="section-base py-24 px-5">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Who we are"
          title="About"
          titleHighlight="ATN"
          description="Pioneering digital transformation with cutting-edge technology solutions since day one."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-snug">
              We build technology that empowers businesses to thrive
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Alpine Technology Network (ATN) is a forward-thinking software
              company specializing in building scalable, user-centric digital
              products. From startups to enterprises, we partner with ambitious
              teams to turn complex ideas into elegant solutions.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our expertise spans full-stack development, cloud architecture, AI
              integration, and UI/UX design. We don&apos;t just write code — we
              engineer experiences that drive growth.
            </p>
            <div className="pt-2">
              <a
                href="#services"
                className="inline-flex items-center space-x-2 bg-white text-[#0a1628] px-6 py-3 rounded-full font-medium text-sm hover:shadow-lg hover:shadow-white/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>Learn More</span>
                <svg
                  className="w-4 h-4"
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
            </div>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-8 text-center hover:-translate-y-1 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(AboutSection);
