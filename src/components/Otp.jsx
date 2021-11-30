import React from "react";
import "./../styles/Otp.css";
import cardImage from './../images/webLogoDark.svg'
const Otp = () => {
  return (
    <div className="fp-changepassword">
        <div className="fp-image">
                    <img src={cardImage} alt="" />
                </div>
      <div className="fp-otp">
        <label htmlFor="otp">Enter OTP</label>
        <input type="text"placeholder="Enter OTP" />
      </div>
      <div className="fp-newPassword">
        <label htmlFor="Newpassword">New Password</label>
        <input type="password" placeholder="New Password" />
      </div>
      <div className="fp-renewPassword">
        <label htmlFor="Newpassword">Re-enter Password</label>
        <input type="password" placeholder="Re-enter Password" />
      </div>
      <div className="fp-submitbtn">
        <button>Submit</button>
      </div>
    </div>
  );
};

export default Otp;