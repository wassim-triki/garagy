import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../../context/UserContext";

const ProtectedRouteNotAuth = ({ children }) => {
  const { user } = useUserAuth();
  return user ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRouteNotAuth;
