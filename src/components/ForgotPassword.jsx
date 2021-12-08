import Axios from "./Axios";
import React from "react";
import {useNavigate} from "react-router-dom";

//styling
import "./../styles/ForgotPassword.css";

//logo 
import cardImage from './../images/webLogoDark.svg'

const ForgotPassword = ()=>{
    
    let navigate = useNavigate();

    //email state
    var email =""
 
    //email onchange
    const handleEmail= (e) =>{
        email = e.target.value;
    }

    //sending otp

    const sendOtp =(e)=>{
        e.preventDefault();
        Axios.post('/verifyemail').then((response)=>{
            if(response.status === 200){
             console.log(response)
              console.log('otp sent successfully')
              navigate('/changepassword');
            }
        })
    }
    
    return (
        <>
            <div className="fp-card">
                <div className="fp-image">
                    <img src={cardImage} alt="" />
                </div>
                <div className="fp-main">
                    <div className="fp-email">
                        <label htmlFor="email">Email</label>
                        <input type="text"placeholder="Enter your Email" onChange={handleEmail} />
                    </div>
                    <div className="fp-button">
                       <button onClick ={sendOtp}>Get Otp</button>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;