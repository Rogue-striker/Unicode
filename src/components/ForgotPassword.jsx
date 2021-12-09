import Axios from "./Axios";
import React from "react";

//styling
import "./../styles/ForgotPassword.css";

//logo
import cardImage from "./../images/webLogoDark.svg";

const ForgotPassword = () => {
  //email state
  var email = "";

  //email onchange
  const handleEmail = (e) => {
    email = e.target.value;
  };

  //sending otp

  const sendOtp = (e) => {
    e.preventDefault();
    console.log(email);
    Axios.post("/forgetpassword", {
      email: email,
    })
      .then((response) => {
        if (response.status === 200) {
          alert("mail sent successfully");
        }
      })
      .catch((err) => {
        alert("please check the mail");
      });
  };

  return (
    <>
      <div className="fp-card">
        <div className="fp-image">
          <img src={cardImage} alt="" />
        </div>
        <div className="fp-main">
          <div className="fp-email">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Enter your Email"
              onChange={handleEmail}
            />
          </div>
          <div className="fp-button">
            <button onClick={sendOtp}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
