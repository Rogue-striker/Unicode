import React ,{useEffect}from "react";
import Axios from "./Axios";
import { useNavigate, useParams } from "react-router-dom"; 
//styling
import "./../styles/Otp.css";



const VerifyEmail = () => {
  const navigate = useNavigate();
  const {token} = useParams();
  useEffect(() => {
        Axios.post("/verifyemail",{token:token}).then((response)=>{
          if(response.data.verifed){
              alert("Account verified!!!...")
              navigate("/login")
          } 
        })
  }, [])
  return (
    <div>verifying passowrd</div>
  );
};

export default VerifyEmail;