import  React from "react";
import { useNavigate} from "react-router-dom";
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
	  if(password !== repassword){
		  alert("passwords does not match")
	  }
    else if(name === "" || email ==="" || password ==="" || repassword ===""){
      alert("enter all the details")
    }
    else{
    
    Axios
      .post("/signup", {
        username: name,
        email: email,
        password: password,
      },
  )
      .then((response) => {
        console.log(response)
		 if(response.data.signedup === true){
       alert("please login after verify your account")  
	     navigate('/login')
		 }
     else if(response.data.found === true){
       alert("user already exists")
       navigate("/login")
     }
     else{
       alert("try again");
     }
      })
      .catch((error) => { 
		  console.log(error);
		 //return <Navigate to="/login"></Navigate>
	});
}
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
