import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../../context/UserContext";

const ProtectedRouteAuth = () => {
  const { user } = useUserAuth();
  return user ? <Navigate to={"/"} /> : <Outlet />;
};

export default ProtectedRouteAuth;
