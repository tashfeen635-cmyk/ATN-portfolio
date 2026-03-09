"use client";

import { memo, useCallback } from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const contactInfo = [
  {
    title: "Our Office",
    lines: ["Alpine Technology Network", "Your Address Here, City, Country"],
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </>
    ),
  },
  {
    title: "Email Us",
    lines: ["info@atn.com", "support@atn.com"],
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
  },
  {
    title: "Call Us",
    lines: ["+1 (000) 000-0000", "Mon - Fri, 9am - 6pm"],
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    ),
  },
];

function ContactSection() {
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
  }, []);
  return (
    <section id="contact" className="section-base py-24 px-5">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Get in touch"
          title="Contact"
          titleHighlight="Us"
          description="Have a project in mind? Let's talk about how we can help bring your vision to life."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="text-xl font-semibold text-white mb-6">
              Send us a message
            </h3>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="First Name"
                  className="contact-input"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="contact-input"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="contact-input"
              />
              <input
                type="text"
                placeholder="Subject"
                className="contact-input"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="contact-input"
                style={{ resize: "none" }}
              />
              <button
                type="submit"
                className="flex items-center justify-center space-x-2 bg-white text-[#0a1628] px-8 py-4 rounded-full font-medium text-base w-full hover:shadow-lg hover:shadow-white/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>Send Message</span>
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
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </form>
          </motion.div>

          {/* Info cards */}
          <div className="space-y-6">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-6 flex items-start space-x-4 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {info.icon}
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">
                    {info.title}
                  </h4>
                  {info.lines.map((line) => (
                    <p key={line} className="text-gray-400 text-sm">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ContactSection);
