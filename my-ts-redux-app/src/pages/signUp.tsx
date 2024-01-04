import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, setUserName } from "../redux/authSlice";
import { Link } from "react-router-dom";
import "./signup.css";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");

  const dispatch = useDispatch();
  const handleSubmit = (
    newName: string,
    newEmail: string,
    newPassword: string,
    newDob: string
  ) => {
    dispatch(setUserName(newName));
    dispatch(login());
  };

  return (
    <div className="form-container">
      <div className="main">
        <div className="title">
          <h1>Sign Up</h1>
        </div>
        <div className="form">
          <div className="name">
            <label>Name</label>
            <input
              type={"text"}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
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
          <div className="dob">
            <label>Date of Birth</label>
            <input
              type={"date"}
              onChange={(e) => setDob(e.target.value)}
            ></input>
          </div>
          <div className="submit">
            <Link to={"/store"}>
              <button onClick={() => handleSubmit(name, email, password, dob)}>
                Submit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
