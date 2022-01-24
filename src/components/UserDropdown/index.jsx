import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserContext";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import "./UserDropdown.css";
import useOnClickOutside from "../../hooks/useOnClickOutside";
const UserDropDown = ({ userDropdown }) => {
  const { logout, setUser } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/login");
      localStorage.clear();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className={`user-dropdown ${!userDropdown && "user-dropdown__invisible"}`}
    >
      <Link className="user-dropdown__link" to={"/profile"}>
        <CgProfile className="user-dropdown__icon" />
        Profile
      </Link>
      <div className="user-dropdown__link" onClick={handleLogout}>
        <BiLogOut className="user-dropdown__icon" />
        Logout
      </div>
    </div>
  );
};

export default UserDropDown;
