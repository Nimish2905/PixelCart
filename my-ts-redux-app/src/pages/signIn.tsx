import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BottomToast from "../components/BottomToast";
import { login } from "../redux/authSlice";
import "./signin.css";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async () => {
    if (!email || !password) {
      <BottomToast message="Please Fill all the fields!" />;
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );


      <BottomToast message="Login Successfull!" />;
      localStorage.setItem("userInfo", JSON.stringify(data));
      // dispatch(setUserName(name));
      dispatch(login());
      history("/store");
    } catch (error) {
      <BottomToast message="Error Occurred" />;
    }
  };
  return (
    <div className="form-container">
      <div className="main">
        <div className="title">
          <h1>Sign In</h1>
        </div>
        <div className="form">
          <div className="email">
            <label>Email ID</label>
            <input
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="password">
            <label>Password</label>
            <input
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="submit">
            <Link to={"/store"}>
              <button onClick={() => submitHandler()}>Submit</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
