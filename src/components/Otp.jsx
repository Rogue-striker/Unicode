import React ,{useState}from "react";

//styling
import "./../styles/Otp.css";

//image
import cardImage from './../images/webLogoDark.svg'



const Otp = () => {
  
  //states
  const [Otp,setOtp] = useState("");
  const [newpwd,setNewpwd] = useState("");
  const [renewpwd,setRenewpwd] = useState("");


  //onchange otp
  const onchangeotp = (e)=>{
    setOtp(e.target.value);
  }

  //onchange new password
  const onchangenewpwd = (e)=>{
    setNewpwd(e.target.value);
  }

  //onchange reenter password
  const onchangerenewpwd = (e)=>{
    setRenewpwd(e.target.value);
  }
  //change password
  const handleSubmitbtn = (e)=>{
    e.preventDefault();
    if(newpwd !== renewpwd){
      alert("password does not match");
    }else{
      console.log("verifying otp")
    }

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
      <div className="fp-newPassword">
        <label htmlFor="Newpassword">New Password</label>
        <input type="password" placeholder="New Password" value ={newpwd} onChange={onchangenewpwd} />
      </div>
      <div className="fp-renewPassword">
        <label htmlFor="Newpassword">Re-enter Password</label>
        <input type="password" placeholder="Re-enter Password" value ={renewpwd} onChange={onchangerenewpwd}/>
      </div>
      <div className="fp-submitbtn">
        <button onClick={handleSubmitbtn}>Submit</button>
      </div>
    </div>
  );
};

export default Otp;