import React ,{useState}from "react";
import { useParams } from "react-router-dom"; 
//styling
import "./../styles/Otp.css";

//image
import cardImage from './../images/webLogoDark.svg'


const VerifyEmail = () => {
  const {token} = useParams();
  console.log(token)
  //states
  const [Otp,setOtp] = useState("");



  //onchange otp
  const onchangeotp = (e)=>{
    setOtp(e.target.value);
  }


  //change password
  const handleSubmitbtn = (e)=>{
    e.preventDefault();
    console.log(Otp)

  }
  return (
    <div className="fp-changepassword">
        <div className="fp-image">
                    <img src={cardImage} alt="" />
                </div>
      <div className="fp-otp">
        <label htmlFor="otp">Enter OTP</label>
        <input type="text"placeholder="Enter OTP" value={Otp} onChange={onchangeotp} />
      </div>
      <div className="fp-submitbtn">
        <button onClick={handleSubmitbtn}>Submit</button>
      </div>
    </div>
  );
};

export default VerifyEmail;