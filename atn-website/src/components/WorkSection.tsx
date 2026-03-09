"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured online marketplace with real-time inventory, payment integration, and analytics dashboard.",
    tags: ["React", "Node.js", "MongoDB"],
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"
      />
    ),
  },
  {
    title: "FinTech Analytics",
    description:
      "AI-powered financial analytics platform providing real-time insights and predictive modeling for investors.",
    tags: ["Python", "AI/ML", "AWS"],
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    ),
  },
  {
    title: "HealthCare App",
    description:
      "A mobile health platform connecting patients with doctors through telemedicine, scheduling, and health tracking.",
    tags: ["Flutter", "Firebase", "Dart"],
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    ),
  },
];

function WorkSection() {
  return (
    <section id="work" className="section-base py-24 px-5">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Our portfolio"
          title="Our"
          titleHighlight="Work"
          description="A showcase of projects we've delivered for clients across industries."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl overflow-hidden group hover:-translate-y-2 hover:border-white/25 transition-all duration-400 hover:shadow-lg hover:shadow-black/20"
            >
              {/* Image placeholder */}
              <div className="h-48 bg-white/[0.04] flex items-center justify-center group-hover:bg-white/[0.07] transition-colors duration-300">
                <svg
                  className="w-16 h-16 text-white/15 group-hover:text-white/25 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {project.icon}
                </svg>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(WorkSection);
