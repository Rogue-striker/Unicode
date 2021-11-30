//libraries
import React from "react";
import { Routes,Route, Navigate } from "react-router";

//components
import LoginCard from "./LoginCard";
import SignUpCard from "./SignUpCard";
import ForgotPassword from "./ForgotPassword";
import "./../styles/LoginPage.css";
import HomePage from "./HomePage";
import Otp from "./Otp";

const LoginPage = () => {
  return (
    <div className="LoginPage">
      <div className="LoginPage-left">
        <p>
          “We discovered in our research that insider threats are not viewed as
          seriously as external threats, like a cyberattack. But when companies
          had an insider threat, in general, they were much more costly than
          external incidents. This was largely because the insider that is smart
          has the skills to hide the crime, for months, for years, sometimes
          forever.”
          <br />
          <div id="author">— Dr. Larry Ponemon</div>
        </p>
      </div>
      <div className="LoginPage-right">
        <Routes>
          <Route path="/login" element={<LoginCard/>}/>
          <Route path="/signup" element={<SignUpCard/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/verify" element={<Otp/>}/>
        </Routes>
      </div>
    </div>
  );
};
export default LoginPage;