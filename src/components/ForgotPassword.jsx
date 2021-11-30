import React from "react";
import { Link } from "react-router-dom";
import cardImage from './../images/webLogoDark.svg'
import "./../styles/ForgotPassword.css";
import Otp from "./Otp";
const ForgotPassword = ()=>{
    return (
        <>
            <div className="fp-card">
                <div className="fp-image">
                    <img src={cardImage} alt="" />
                </div>
                <div className="fp-main">
                    <div className="fp-email">
                        <label htmlFor="email">Email</label>
                        <input type="text"placeholder="Enter your Email" />
                    </div>
                    <div className="fp-button">
                       <Link to="/verify">
                       <button>Get Otp</button>
                       </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;