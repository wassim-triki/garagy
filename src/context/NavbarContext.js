import { createContext, useState } from "react";

const NavbarContext = createContext();

const NavbarProvider = ({ children }) => {
  const [transparent, setTransparent] = useState(false);
  return (
    <NavbarContext.Provider value={{ transparent, setTransparent }}>
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarContext;
export { NavbarProvider };
