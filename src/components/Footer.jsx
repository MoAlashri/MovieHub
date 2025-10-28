import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-400 py-10 px-6 mt-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
        {/* 🎥 Logo & Description */}
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Movie<span className="text-red-500">Hub</span>
          </h1>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Discover, explore, and stay updated with the latest movies and TV
            shows. Your ultimate hub for cinematic experiences 🎬
          </p>
        </div>

        {/* 🔗 Quick Links */}
        <div>
          <h2 className="text-white font-semibold text-lg mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-red-500 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a
                href="/movies"
                className="hover:text-red-500 transition-colors"
              >
                Movies
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-red-500 transition-colors">
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-red-500 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* 🌐 Social Links */}
        <div>
          <h2 className="text-white font-semibold text-lg mb-3">Follow Us</h2>
          <div className="flex justify-center md:justify-start space-x-5 text-xl">
            <a
              href="#"
              className="hover:text-red-500 transition-transform transform hover:scale-110"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="hover:text-red-500 transition-transform transform hover:scale-110"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="hover:text-red-500 transition-transform transform hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="hover:text-red-500 transition-transform transform hover:scale-110"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* 🔻 Divider & Copyright */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">MovieHub</span>. Built with
          ❤️ by Mohamed Alashri.
        </p>
      </div>
    </footer>
  );
}
