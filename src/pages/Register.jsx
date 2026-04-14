import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaFilm, FaCheck } from "react-icons/fa";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const passwordStrength = () => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength()];
  const strengthColor = ["", "bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-green-500"][passwordStrength()];

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }

  const features = [
    "Unlimited streaming access",
    "Personalized recommendations",
    "Create custom watchlists",
    "HD & 4K quality content",
  ];

  return (
    <div className="flex min-h-[calc(100vh-72px)] overflow-hidden">
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center bg-gradient-to-br from-primary/20 via-black to-black relative overflow-hidden px-14">
        {/* Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-purple-600/15 blur-3xl" />

        <div className="relative z-10 max-w-sm">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <FaFilm className="text-white" />
            </div>
            <span className="text-2xl font-black text-white">
              Movie<span className="text-primary">Hub</span>
            </span>
          </div>

          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            Join Millions of<br />
            <span className="text-primary">Movie Lovers</span>
          </h2>
          <p className="text-gray-400 mb-10 leading-relaxed">
            Get unlimited access to the best movies, TV shows, and exclusive content from around the world.
          </p>

          <ul className="space-y-4">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
                  <FaCheck className="text-primary text-xs" />
                </div>
                <span className="text-gray-300 text-sm">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 md:px-14 bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden py-10">
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-yellow-500/10 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="mb-8">
            <h1 className="text-4xl font-black text-white mb-2">
              Create Account 🚀
            </h1>
            <p className="text-gray-400">
              Start your free cinematic journey today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/60 focus:bg-white/10 transition-all"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2" htmlFor="reg-email">
                Email Address
              </label>
              <input
                type="email"
                id="reg-email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/60 focus:bg-white/10 transition-all"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2" htmlFor="reg-password">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="reg-password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/60 focus:bg-white/10 transition-all pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {/* Strength meter */}
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          i <= passwordStrength() ? strengthColor : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">
                    Password strength: <span className="text-white font-medium">{strengthLabel}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2" htmlFor="confirm">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  id="confirm"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  placeholder="Repeat your password"
                  className={`w-full px-4 py-3.5 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 transition-all pr-12 ${
                    form.confirm && form.confirm !== form.password
                      ? "border-red-500/60 focus:border-red-500/80"
                      : "border-white/10 focus:border-primary/60"
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {form.confirm && form.confirm !== form.password && (
                <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 mt-0.5 accent-red-600 shrink-0"
                required
              />
              <span className="text-gray-400 text-sm">
                I agree to the{" "}
                <span className="text-primary hover:text-red-400 cursor-pointer">Terms of Service</span>
                {" "}and{" "}
                <span className="text-primary hover:text-red-400 cursor-pointer">Privacy Policy</span>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || (form.confirm && form.confirm !== form.password)}
              className="w-full bg-primary hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <Link to="/Login" className="text-primary hover:text-red-400 font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
