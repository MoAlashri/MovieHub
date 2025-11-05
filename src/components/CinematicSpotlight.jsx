import React from "react";
import { motion } from "framer-motion";

export default function CreditsOutro() {
  return (
    <div className="bg-black text-white text-center py-20 relative overflow-hidden">
      <motion.div
        className="text-2xl md:text-4xl font-bold mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        🎬 The End
      </motion.div>
      <motion.p
        className="text-gray-400 text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 3, delay: 0.5 }}
      >
        Designed & Developed by <span className="text-primary">Mohamed Alashry</span> 🚀
      </motion.p>
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-primary"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 2 }}
      />
    </div>
  );
}
