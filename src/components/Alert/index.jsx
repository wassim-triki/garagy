import "./Alert.css";
import { RiCloseLine } from "react-icons/ri";
import { useState, useEffect } from "react";
const Alert = ({
  variant = "success",
  text,
  id = 0,
  defaultVisible = false,
}) => {
  const [visible, setVisible] = useState(defaultVisible);
  const handleCloseAlert = () => {
    setVisible(false);
  };

  useEffect(() => {
    setVisible(text.length > 0);
    console.log(text);
  }, [id]);
  useEffect(() => {
    // setTimeout(() => {
    //   if (visible) {
    //     setVisible(false);
    //   }
    // }, 4000);
  });
  return (
    <div className={`alert ${variant} ${visible ? "visible" : ""}`}>
      <p className="alert__text">{text}</p>
      <RiCloseLine className="alert__close" onClick={handleCloseAlert} />
    </div>
  );
};

export default Alert;
