import React from "react";
import "./Navbar.css";
import logo from "../models/logo/logo-transparent-png.png";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userInfo");
  };
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const retrieveUserInfo = localStorage.getItem("userInfo");
  const userInfo = retrieveUserInfo ? JSON.parse(retrieveUserInfo) : {};

  return (
    <div className="nav-body">
      <div className="logo">
        <Link to={"/"}>
          <img src={logo} alt="Loading"></img>
        </Link>
      </div>
      {!isAuthenticated ? (
        <div className="content-sign">
          <Link to={"/signin"}>
            <button>Sign In</button>
          </Link>
          <Link to={"/signup"}>
            <button>Sign Up</button>
          </Link>
        </div>
      ) : (
        <div className="content">
          <h3>{userInfo.name}</h3>
          <Link to={"/"}>
            <button onClick={() => handleLogout()}>LogOut</button>
          </Link>
          <Link to={"/cart"}>
            <button>My Cart</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
