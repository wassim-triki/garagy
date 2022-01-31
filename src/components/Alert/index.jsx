import "./Alert.css";
import { RiCloseLine } from "react-icons/ri";
import { useState, useEffect } from "react";
const Alert = ({ variant = "success", text, id }) => {
  const [visible, setVisible] = useState(false);
  const handleCloseAlert = () => {
    setVisible(false);
  };
  useEffect(() => {
    setVisible(text.length > 0);
  }, [id]);
  return (
    <div className={`alert ${variant} ${visible ? "visible" : ""}`}>
      <p className="alert__text">{text}</p>
      <RiCloseLine className="alert__close" onClick={handleCloseAlert} />
    </div>
  );
};

export default Alert;
