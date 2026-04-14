import React from "react";
import Header from "../components/ui/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/ui/Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
