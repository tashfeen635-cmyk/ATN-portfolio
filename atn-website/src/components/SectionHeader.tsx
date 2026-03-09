"use client";

import { memo } from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
}

function SectionHeader({
  badge,
  title,
  titleHighlight,
  description,
}: SectionHeaderProps) {
  return (
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2 mb-6"
      >
        <span className="w-2 h-2 bg-white rounded-full" />
        <span className="text-sm text-gray-200">{badge}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
      >
        <span className="text-white">{title} </span>
        <span className="text-gray-300">{titleHighlight}</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg"
      >
        {description}
      </motion.p>
    </div>
  );
}

export default memo(SectionHeader);
