import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function CinematicSpotlight() {
  return (
    <div className="relative overflow-hidden bg-black text-white py-24 text-center">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-primary/10 blur-3xl rounded-full" />

      {/* Animated lines */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
        initial={{ width: 0, left: "50%" }}
        whileInView={{ width: "100%", left: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        viewport={{ once: true }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <motion.div
          className="text-6xl mb-6"
          initial={{ scale: 0, rotate: -10 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
          viewport={{ once: true }}
        >
          🎬
        </motion.div>

        <motion.h2
          className="text-3xl md:text-5xl font-black mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Ready to{" "}
          <span className="text-primary">
            Start Watching?
          </span>
        </motion.h2>

        <motion.p
          className="text-gray-400 text-lg mb-10 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          Thousands of movies and TV shows await. Your cinematic adventure begins now.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/Movies"
            className="group flex items-center justify-center gap-2 bg-primary hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
          >
            Explore Movies
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/Register"
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105"
          >
            Join for Free
          </Link>
        </motion.div>

        <motion.p
          className="mt-12 text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
        >
          Designed & Developed by{" "}
          <span className="text-primary font-semibold">Mohamed Alashry</span> 🚀
        </motion.p>
      </motion.div>
    </div>
  );
}
