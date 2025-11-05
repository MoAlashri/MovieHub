import React from "react";
import { motion } from "framer-motion";

export default function SectionHeader({ title }) {
  return (
    <section className="m-10 text-white">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-6 pl-4 relative flex items-center"
      >
        {/* red gradient bar */}
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[6px] h-10 rounded-full bg-gradient-to-b from-red-600 via-red-500 to-orange-400 shadow-[0_0_10px_rgba(255,70,70,0.7)]"></span>

        {/* title text */}
        <span className="ml-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
          {title} <span className="text-red-500 drop-shadow-[0_0_6px_rgba(255,60,60,0.8)]">🔥</span>
        </span>
      </motion.h2>
    </section>
  );
}
