import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SiEsphome } from "react-icons/si";
import { BiCameraMovie } from "react-icons/bi";
import { LuTv } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa";
import { CgLogIn } from "react-icons/cg";
import { IoMdLogIn } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home", icon: <SiEsphome /> },
    { to: "/Movies", label: "Movies", icon: <BiCameraMovie /> },
    { to: "/TvShow", label: "TV Shows", icon: <LuTv /> },
    { to: "/WatchList", label: "WatchList", icon: <FaRegBookmark /> },
  ];

  return (
    <header className="flex items-center justify-between h-[72px] px-4 m-5 mb-2 text-white rounded-lg bg-black/40 backdrop-blur-md shadow-lg sticky top-0 z-50">
      {/* 🔹 Logo */}
      <NavLink to="/" className="flex items-center gap-1">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Movie<span className="text-red-500">Hub</span>
        </h1>
      </NavLink>

      {/* 🔹 Desktop Nav */}
      <nav className="hidden md:flex gap-6 h-full items-center">
        {navLinks.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive
                ? "text-primary font-bold border-b-2 border-primary text-xl flex items-center justify-center gap-1 transition duration-300"
                : "text-text-secondary hover:text-primary text-xl hover:border-b-2 border-primary transition duration-300 flex items-center justify-center gap-1"
            }
          >
            {icon} {label}
          </NavLink>
        ))}
      </nav>

      {/* 🔹 Buttons (Desktop) */}
      <div className="hidden md:flex gap-4">
        <NavLink to="/Login">
          <button className="px-4 py-2 text-lg font-semibold text-white rounded bg-primary hover:bg-red-700 transition duration-300 flex items-center gap-1">
            <CgLogIn /> Login
          </button>
        </NavLink>
        <NavLink to="/Register">
          <button className="px-4 py-2 text-lg font-semibold text-black rounded bg-secondary hover:bg-yellow-500 transition duration-300 flex items-center gap-1">
            <IoMdLogIn /> Sign up
          </button>
        </NavLink>
      </div>

      {/* 🔹 Mobile Menu Button */}
      <button
        className="md:hidden text-3xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <IoMdClose /> : <RxHamburgerMenu />}
      </button>

      {/* 🔹 Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-black/90 backdrop-blur-lg border-t border-gray-800 flex flex-col items-center py-6 space-y-6 md:hidden animate-fadeIn">
          {navLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-red-500 font-bold text-xl flex items-center gap-2 transition"
                  : "text-gray-300 hover:text-red-500 text-xl flex items-center gap-2 transition"
              }
            >
              {icon} {label}
            </NavLink>
          ))}

          {/* Buttons in Mobile */}
          <div className="flex flex-col gap-3 mt-4">
            <NavLink
              to="/Login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold text-lg"
            >
              <CgLogIn /> Login
            </NavLink>
            <NavLink
              to="/Register"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg"
            >
              <IoMdLogIn /> Sign up
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
