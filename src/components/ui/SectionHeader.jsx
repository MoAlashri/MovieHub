import React from "react";
import { motion } from "framer-motion";

export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="px-6 md:px-10 pt-16 pb-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-4 mb-2">
          <span className="w-1.5 h-10 rounded-full bg-gradient-to-b from-red-500 to-orange-500 shadow-[0_0_12px_rgba(229,9,20,0.7)] shrink-0" />
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-gray-400 text-sm md:text-base ml-6 mt-1">
            {subtitle}
          </p>
        )}
        <div className="h-px bg-gradient-to-r from-primary/40 via-white/10 to-transparent mt-4 ml-6" />
      </motion.div>
    </div>
  );
}
