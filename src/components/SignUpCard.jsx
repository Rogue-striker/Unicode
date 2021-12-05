import  React from "react";
import { useNavigate ,Navigate} from "react-router-dom";
import Axios from "./Axios";

//styling
import "./../styles/SignUpCard.css";

//components
import cardImage from "./../images/webLogoDark.svg";


const SignUpCard = () => {
 

 let navigate = useNavigate();
  //states
  var name = "";
  var email = "";
  var password ="";
  var repassword = "";


  //sign up button
  const handleSignBtn = () => {
    console.log(name,email,password)
	  if(password !== repassword){
		  alert("passwords does not match")
	  }
    Axios
      .post("/signup", {
        username: name,
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
                onChange={(e) => {
                  name = e.target.value;
                }}
              />
            </div>
            <div className="signupcard-field">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Email"
               
                onChange={(e) => {
                  email = e.target.value
              }}
              />
            </div>
            <div className="signupcard-field">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                placeholder="password"
                onChange={(e) => {
                  password = e.target.value;
                }}
              />
            </div>
            <div className="signupcard-field">
              <label htmlFor="Password">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                onChange={(e) => {
                  repassword = e.target.value; 
                }}
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
