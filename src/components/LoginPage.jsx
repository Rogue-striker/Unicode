//libraries
import React from "react";
import { Outlet } from "react-router-dom";


import "./../styles/LoginPage.css";


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
          <p id="author">— Dr. Larry Ponemon</p>
        </p>
      </div>
      <div className="LoginPage-right">
      <Outlet/>
      </div>
     
    </div>
  );
};
export default LoginPage;
