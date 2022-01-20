import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTopOnRouteChange = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scroll(0, 0);
  }, [location.pathname]);
  return <></>;
};

export default ScrollTopOnRouteChange;
