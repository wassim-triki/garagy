import { useEffect } from "react";

const useOnClickOutside = (ref, callBack) => {
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callBack();
    }
  };
  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [ref]);
};

export default useOnClickOutside;
