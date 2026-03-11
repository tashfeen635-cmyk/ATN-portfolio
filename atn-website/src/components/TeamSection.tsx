"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const team = [
  {
    initials: "JD",
    name: "John Doe",
    role: "CEO & Founder",
    bio: "Visionary leader with 15+ years in tech, driving innovation and strategic growth.",
  },
  {
    initials: "SA",
    name: "Sarah Ahmed",
    role: "CTO",
    bio: "Full-stack architect passionate about scalable systems and emerging technologies.",
  },
  {
    initials: "MK",
    name: "Mike Khan",
    role: "Lead Designer",
    bio: "Creative mind crafting intuitive user experiences and stunning visual interfaces.",
  },
  {
    initials: "LR",
    name: "Lina Rashid",
    role: "Project Manager",
    bio: "Agile expert ensuring seamless delivery and exceptional client collaboration.",
  },
];

const LinkedInIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

function TeamSection() {
  return (
    <section id="team" aria-label="Our Team" className="section-base py-24 px-5">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="The people behind ATN"
          title="Meet Our"
          titleHighlight="Team"
          description="A passionate group of innovators dedicated to delivering world-class technology solutions."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-8 text-center group hover:-translate-y-2 hover:border-white/25 hover:bg-white/[0.06] transition-all duration-400 hover:shadow-lg hover:shadow-white/5"
            >
              <div className="w-28 h-28 rounded-full bg-white/10 border-[3px] border-white/20 flex items-center justify-center mx-auto mb-5 text-3xl font-bold text-white group-hover:border-white/50 group-hover:shadow-lg group-hover:shadow-white/10 transition-all duration-400">
                {member.initials}
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {member.name}
              </h3>
              <p className="text-gray-400 text-sm font-medium mb-3">
                {member.role}
              </p>
              <p className="text-gray-400/80 text-sm mb-5 leading-relaxed">
                {member.bio}
              </p>
              <div className="flex justify-center space-x-3">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/15 hover:border-white/40 transition-all duration-300"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/15 hover:border-white/40 transition-all duration-300"
                >
                  <XIcon />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(TeamSection);
