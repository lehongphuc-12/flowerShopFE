import React from "react";
import Login from "../pages/Login";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default LoginLayout;
