import  React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//styling
import "./../styles/SignUpCard.css";

//components
import cardImage from "./../images/webLogoDark.svg";
import { Navigate } from "react-router";

const SignUpCard = () => {
 
 let navigate = useNavigate();
  //states
  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfpassword] = useState("");

  //username state
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  //email state
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  //password state
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  //confirm password state
  const handleCnfpassword = (e) => {
    setCnfpassword(e.target.value);
  };

  //sign up button
  const handleSignBtn = () => {
	  if(password !== cnfpassword){
		  alert("passwords does not match")
	  }
    axios
      .post("http://localhost:5000/login", {
        username: Username,
        email: email,
        password: password,
      })
      .then((response) => {
		  console.log(response)
		 if(response.status === 200){
			navigate('/login')
		 }
      })
      .catch((error) => { 
		  console.log(error);
		 return <Navigate to="/login"></Navigate>
	});
  };

  return (
    <>
      <div className="signupcard">
        <div className="signupcard-image">
          <img src={cardImage} alt="" />
        </div>
        <div className="signupcard-title">
          <h2>Sign In</h2>
        </div>
        <div className="signupcard-main">
          <div className="signupcard-details">
            <div className="signupcard-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Name"
                value={Username}
                onChange={handleUsername}
              />
            </div>
            <div className="signupcard-field">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleEmail}
              />
            </div>
            <div className="signupcard-field">
              <label htmlFor="Password">Password</label>
              <input
                type="text"
                placeholder="password"
                value={password}
                onChange={handlePassword}
              />
            </div>
            <div className="signupcard-field">
              <label htmlFor="Password">Confirm Password</label>
              <input
                type="text"
                placeholder="Confirm password"
                value={cnfpassword}
                onChange={handleCnfpassword}
              />
            </div>
            <div className="signupcard-button">
              <button onClick={handleSignBtn}>Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUpCard;
