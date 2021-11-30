import axios from "axios";
import React,{useState} from "react";
import {useNavigate} from "react-router-dom";

//styling
import "./../styles/ForgotPassword.css";

//logo 
import cardImage from './../images/webLogoDark.svg'

const ForgotPassword = ()=>{
    
    let navigate = useNavigate();

    //email state
    const [email,setEmail] = useState("");
 
    //email onchange
    const handleEmail= (e) =>{
        setEmail(e.target.value);
    }

    //sending otp
    const sendOtp =(e)=>{
        e.preventDefault();
        axios.get('http://localhost:5000/sendotp').then((response)=>{
            if(response.status === 200){
              console.log('otp sent successfully')
              navigate('/verifyOtp');
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
                        <input type="text"placeholder="Enter your Email" value={email}onChange={handleEmail} />
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