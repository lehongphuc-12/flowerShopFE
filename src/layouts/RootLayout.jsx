import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import Header from "../components/layout/Header.jsx";
import Categories from "../components/layout/Categories.jsx";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Categories />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
