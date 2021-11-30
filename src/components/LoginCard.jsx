import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  updateEmail,
  updatePassword,
  setUserid,
  updateLogin,
} from "../features/LoginReducer";
 
//components
import "./../styles/LoginCard.css";
import cardImage from "./../images/webLogoDark.svg";
import ForgotPassword from "./ForgotPassword";

const LoginCard = () => {
  const dispatch = useDispatch();

  // fetching the values from store
  const emailval = useSelector((state) => state.login.email);
  const passwordval = useSelector((state) => state.login.password);

  //updating the states of the fields
  const [emailstate, setEmail] = useState("");
  const [pass, setPassword] = useState("");

  //email field onchange
  const handleChangeEmail =(e) => {
    setEmail(e.target.value)
    console.log(emailstate)
    dispatch(updateEmail(emailstate));
  };

  //password field onchange
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    dispatch(updatePassword(pass));
  };

  //Login button onclick function
  const handleLogin = (e) => {
    e.preventDefault();
    if (emailval === "" && passwordval === "") {
      alert("enter the data");
    }
    axios
      .post("https://localhost:5000/login", {
        email: emailval,
        password: passwordval,
      })
      .then((response) => {
        console.log(response);
        dispatch(setUserid(response.data));
        dispatch(updateLogin(true));
      })
      .catch((error) => {
        console.log(emailval,passwordval)
        console.log(error);
      });
  };

  return (
    <>
      <div className="card">
        <div className="card-image">
          <img src={cardImage} alt="" />
        </div>
        <div className="card-title">
          <h2>Login</h2>
        </div>
        <div className="card-main">
          <div className="card-details">
            <div className="card-UserName">
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                placeholder="Email"
                value={emailstate}
                onChange={handleChangeEmail}
              />
            </div>
            <div className="card-password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={pass}
                onChange={handleChangePassword}
              />
            </div>
          </div>
          <div className="card-button">
            <button onClick={handleLogin}>Login</button>
          </div>
          <div className="card-extras">
            <div className="card-forgot">
              <Link to="/forgotpassword" element={<ForgotPassword />}>
                <button className="card-forgotbtn">Forgot Password?</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginCard;
