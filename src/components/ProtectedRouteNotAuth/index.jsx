import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../../context/UserContext";
import { auth } from "../../firebase-config";

const ProtectedRouteNotAuth = ({ children }) => {
  const { user } = useUserAuth();
  return user || auth.currentUser ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRouteNotAuth;
