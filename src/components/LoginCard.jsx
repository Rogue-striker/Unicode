import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  setUsername,
  updateLogin,
  updateEmail,
} from "../features/LoginReducer";

//components

import Axios from "./Axios";
import "./../styles/LoginCard.css";
import cardImage from "./../images/webLogoDark.svg";
import ForgotPassword from "./ForgotPassword";

const LoginCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  var email = "";
  var password = "";

  //Login button onclick function
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "" && password === ""){
      alert("enter the data");
    }
    else{
    Axios.post("/login", {
      user_email: email,
      password: password,
    })
      .then((response) => {
      //  console.log(response)
        if(response.data.found === false){
          alert("user not found sign up")
        }
        else{
        if (response.data.login === true) {
          dispatch(setUsername(response.data.name))
          dispatch(updateLogin(true));
          dispatch(updateEmail(email))
          navigate("/home/projects")
          localStorage.setItem('accesstoken',JSON.stringify({accesstoken:response.data.token}))
          localStorage.setItem('token',JSON.stringify({login:true,useremail:email,username:response.data.name}))
        }else if(response.data.login === false){
           alert("wrong password");
        }
      }
      })
      .catch((error) => {
       // console.log(email, password);
        console.log(error);
      });
    }
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
                onChange={(e)=>{email=e.target.value}}
              />
            </div>
            <div className="card-password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                onChange={(e)=>{password = e.target.value}}
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
