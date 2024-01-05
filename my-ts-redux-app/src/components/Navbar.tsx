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
  };
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const userName = useSelector((state: RootState) => state.auth.userName);

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
          <h3>{userName ? userName : "RANDOM GUY"}</h3>
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
