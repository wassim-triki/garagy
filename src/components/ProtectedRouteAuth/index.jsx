import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../../context/UserContext";
import { auth } from "../../firebase-config";

const ProtectedRouteAuth = () => {
  const { user } = useUserAuth();
  return user || auth.currentUser ? <Navigate to={"/"} /> : <Outlet />;
};

export default ProtectedRouteAuth;
