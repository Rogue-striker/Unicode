import React from 'react';
import './../styles/SignUpCard.css';

import cardImage from './../images/webLogoDark.svg'

const SignUpCard = ()=>{
    return(
        <>
        <div className="signupcard">
            <div className="signupcard-image">
                <img src ={cardImage} alt=""/>
            </div>
            <div className="signupcard-title">
                <h2>Sign In</h2>
            </div>
            <div className="signupcard-main">
                <div className="signupcard-details">
                    <div className="signupcard-field">
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="Name" />
                    </div>
                    <div className="signupcard-field">
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder = "Email"/>
                    </div>
                    <div className="signupcard-field">
                        <label htmlFor="Password">Password</label>
                        <input type="text" placeholder = "password" />
                    </div>
                    <div className="signupcard-field">
                        <label htmlFor="Password">Confirm Password</label>
                        <input type="text" placeholder = "Confirm password" />
                    </div>
                    <div className="signupcard-button">
                    <button>Sign In</button>
                </div>
                </div>
            </div>
        </div>
        </>
    );
}
export default SignUpCard;