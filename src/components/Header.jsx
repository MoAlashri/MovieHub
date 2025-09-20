import React from "react";
import { NavLink } from "react-router-dom";
import { SiEsphome } from "react-icons/si";
import { BiCameraMovie } from "react-icons/bi";
import { LuTv } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa";
import { CgLogIn } from "react-icons/cg";
import { IoMdLogIn } from "react-icons/io";



export default function Header() {
  return (
    <header className="flex items-center justify-between h-[72px] px-2  m-5 text-white rounded-lg bg-black/40 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div>
        <NavLink
          className="text-3xl font-extrabold tracking-tight text-primary font-vibes"
          to={"/"}
        >
          MovieHup
        </NavLink>
      </div>
      <nav className="flex gap-6 h-[100%] items-center">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold border-b-2 border-primary text-xl flex items-center justify-center gap-1 transition duration-300"
              : "text-text-secondary hover:text-primary text-xl hover:border-b-2 border-primary transition duration-300 flex items-center justify-center gap-1"
          }
          to={"/"}
        >
          <SiEsphome /> Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold border-b-2 border-primary text-xl flex items-center justify-center gap-1 transition duration-300"
              : "text-text-secondary hover:text-primary text-xl hover:border-b-2 border-primary transition duration-300 flex items-center justify-center gap-1"
          }
          to={"/Movies"}
        >
          <BiCameraMovie /> Movies
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold border-b-2 border-primary text-xl flex items-center justify-center gap-1 transition duration-300"
              : "text-text-secondary hover:text-primary text-xl hover:border-b-2 border-primary transition duration-300 flex items-center justify-center gap-1"
          }
          to={"/TvShow"}
        >
        <LuTv/>  TV Shows
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold border-b-2 border-primary text-xl flex items-center justify-center gap-1 transition duration-300"
              : "text-text-secondary hover:text-primary text-xl hover:border-b-2 border-primary transition duration-300 flex items-center justify-center gap-1"
          }
          to={"/WatchList"}
        >
        <FaRegBookmark/>  WhatchList
        </NavLink>
      </nav>
      <div className="flex gap-4">
        <button className="px-4 py-2 text-lg font-semibold text-white rounded bg-primary hover:bg-red-700  transition duration-300">
          <NavLink to={"/Login"} className='flex items-center justify-center gap-1'><CgLogIn/> Login</NavLink>
        </button>
        <button className="px-4 py-2 text-lg font-semibold text-black transition duration-300 rounded bg-secondary hover:bg-yellow-500">
          <NavLink to={"/Register"} className='flex items-center justify-center gap-1'><IoMdLogIn/> Sign up</NavLink>
        </button>
      </div>
    </header>
  );
}
