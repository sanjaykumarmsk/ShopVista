import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";

import logo from "../Assests/logo.png";
import cart_icon from "../Assests/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assests/nav_dropdown.png";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const toggleDropdown = () => {
    menuRef.current.classList.toggle("nav-menu-visible");
  };

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
    toggleDropdown();
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>ShopVista</p>
      </div>
      <img
        className="nav-dropdown"
        onClick={toggleDropdown}
        src={nav_dropdown}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        {["shop", "mens", "womens", "kids"].map((menuItem) => (
          <li key={menuItem} onClick={() => handleMenuClick(menuItem)}>
            <Link to={`/${menuItem}`} style={{ textDecoration: "none" }}>
              {menuItem.charAt(0).toUpperCase() + menuItem.slice(1)}
            </Link>
            {menu === menuItem ? <hr /> : null}
          </li>
        ))}
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}

        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
