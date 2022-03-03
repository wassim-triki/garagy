import React from "react";
import { forwardRef, useRef, useState } from "react";

import { FaCarSide, FaUser } from "react-icons/fa";
import { RiArrowDropDownFill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { useEffect } from "react/cjs/react.development";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { Link } from "react-router-dom";

const SearchForm = ({
  desktop = false,
  showDropdown = true,
  shrink = false,
  setExpandForm,
}) => {
  const [input, setInput] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [shrunk, setShrunk] = useState(shrink);
  const searchRef = useRef(null);
  const formRef = useRef(null);
  const expandForm = (e) => {
    e.preventDefault();
    if (shrunk) {
      setShrunk(false);
      setExpandForm && setExpandForm(true);
    }
  };
  useOnClickOutside(formRef, () => {
    setDropdown(false);
    setShrunk(true);
    setExpandForm && setExpandForm(false);
  });

  return (
    <form
      ref={formRef}
      className={`form${shrunk && !desktop ? " shrink" : ""}`}
    >
      <div className="form__buttons">
        <button
          onClick={expandForm}
          type="submit"
          className="form-btn form-btn-search"
        >
          <FiSearch className="input" />
        </button>
        <button
          type="button"
          onClick={() => setDropdown(true)}
          className="form-btn form-btn-arrow"
        >
          <RiArrowDropDownFill className="arrow" />
        </button>
      </div>
      <input
        className="form__search"
        ref={searchRef}
        value={input}
        type="text"
        placeholder="Search"
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setDropdown(true)}
      />
      {showDropdown && dropdown && (
        <ul className="dropDown">
          <Link to={"/cars"}>
            <li onClick={() => setDropdown(false)} className="dropDown__item">
              <FaCarSide />
              <div className="dropDown__item__text">
                <p className="dropDown__item__title">Cars</p>
                <p className="dropDown__item__desc">
                  Browse available cars for rental.
                </p>
              </div>
            </li>
          </Link>
        </ul>
      )}
    </form>
  );
};

export default SearchForm;
