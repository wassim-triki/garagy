import React from "react";
import "./ContentBox.css";
const ContentBox = ({ children }) => {
  return <div className="preview">{children}</div>;
};

export default ContentBox;
