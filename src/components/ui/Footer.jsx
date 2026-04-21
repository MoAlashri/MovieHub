import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF, FaTwitter, FaInstagram, FaGithub,
  FaFilm, FaHeart,
} from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { LuTv } from "react-icons/lu";
import { FaBookmark } from "react-icons/fa";
import {FaLinkedin} from "react-icons/fa";

const links = {
  Explore: [
    { label: "Movies", to: "/Movies", icon: <BiCameraMovie /> },
    { label: "TV Shows", to: "/TvShow", icon: <LuTv /> },
    { label: "Watchlist", to: "/WatchList", icon: <FaBookmark /> },
  ],
  Account: [
    { label: "Login", to: "/Login" },
    { label: "Sign Up", to: "/Register" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-400 pt-16 pb-8 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <FaFilm className="text-white text-sm" />
              </div>
              <span className="text-2xl font-black text-white">
                Movie<span className="text-primary">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm mb-6">
              Your ultimate destination for discovering, exploring, and staying updated with the latest movies and TV shows. Powered by TMDB.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {[
                { icon: <FaTwitter />, href: "https://x.com/MoAmged19" },
                { icon: <FaInstagram />, href: "https://www.instagram.com/mohamed_amged19" },
                { icon: <FaLinkedin />, href: "www.linkedin.com/in/mohamedalashry19" },
                { icon: <FaGithub />, href: "https://github.com/MoAlashri" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 hover:scale-110"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
                {section}
              </h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {item.icon && (
                        <span className="text-primary">{item.icon}</span>
                      )}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* TMDB attribution */}
        <div className="flex items-center gap-3 mb-6 p-4 bg-white/5 border border-white/5 rounded-xl">
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="TMDB"
            className="h-5 opacity-60"
          />
          <p className="text-xs text-gray-500">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-semibold">MovieHub</span>. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-gray-500">
            Built with <FaHeart className="text-primary text-xs" /> by{" "}
            <span className="text-white font-semibold">Mohamed Alashry</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
