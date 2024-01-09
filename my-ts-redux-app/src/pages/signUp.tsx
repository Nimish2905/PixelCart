import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, setUserName } from "../redux/authSlice";
import { Link } from "react-router-dom";
import "./signup.css";
import { useNavigate } from "react-router";
import axios from "axios";
import BottomToast from "../components/BottomToast";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [showToast, setShowToast] = useState(false);  
  const [toastMessage, setToastMessage] = useState("");
  const history = useNavigate();

  const dispatch = useDispatch();

 const showToastMessage = (message: string) => {
   setToastMessage(message);
   setShowToast(true);
 };

 useEffect(() => {
   if (showToast) {
     const timer = setTimeout(() => {
       setShowToast(false);
     }, 3000);

     return () => clearTimeout(timer);
   }
 }, [showToast]);

  const submitHandler = async () => {
    if (!name || !email || !password || !dob) {
      showToastMessage("Please Fill all the fields!");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/",
        {
          name,
          email,
          password,
          dob,
        },
        config
      );
      showToastMessage("Registration Successful!");
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(setUserName(name));
      dispatch(login());
      history("/store");
    } catch (error) {
      console.log(error);
      showToastMessage("Error Occurred");
    }
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
              <button onClick={() => submitHandler()}>Submit</button>
            </Link>
          </div>
        </div>
      </div>
      {showToast && <BottomToast message={toastMessage} />}
    </div>
  );
};

export default SignUp;
