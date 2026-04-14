import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHome, FaFilm } from "react-icons/fa";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900" />
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-lg"
      >
        {/* Giant 404 */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="relative mb-6"
        >
          <span
            className="text-[160px] md:text-[200px] font-black leading-none select-none"
            style={{
              background: "linear-gradient(135deg, #E50914, #ff4c4c, #ff8888)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "none",
              filter: "drop-shadow(0 0 40px rgba(229,9,20,0.4))",
            }}
          >
            404
          </span>
        </motion.div>

        {/* Film reel icon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-6xl mb-6"
        >
          🎬
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl md:text-4xl font-black mb-3"
        >
          Scene Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 text-lg mb-10 leading-relaxed"
        >
          Looks like this page got cut from the final edit. 
          Let's get you back to the main feature.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-primary hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
          >
            <FaHome /> Back to Home
          </Link>
          <Link
            to="/Movies"
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105"
          >
            <FaFilm /> Browse Movies
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
