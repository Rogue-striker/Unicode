import React from 'react';
import {Link} from 'react-router-dom'
import './../styles/LoginCard.css'
import cardImage from './../images/webLogoDark.svg'
import ForgotPassword from './ForgotPassword';

const LoginCard = () =>{
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
                        <input type="text" placeholder="Email"/>
                    </div>
                    <div className="card-password">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Password"/>
                    </div>
                </div>
                <div className="card-button">
                    <button>Login</button>
                </div>
                <div className="card-extras">
                    <div className="card-forgot">
                    <Link to='/forgotpassword' element={<ForgotPassword/>}><button className="card-forgotbtn">Forgot Password?</button></Link>
                    </div>
                </div>
            </div>
        </div>
        </>

    );

}

export default LoginCard;