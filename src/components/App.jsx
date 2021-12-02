//library imports
import React from "react";
import { Routes,Route,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
//style sheet
import "../styles/App.css";

//components
import Nav from "./Nav";
import LoginPage from "./LoginPage";
import Homepage from "./HomePage";



const App = () => {
  var loggedin = useSelector((state)=>state.login.setSignedin);
  return (
    <div className="container">
        <Nav/>
        <Routes>
          <Route path='/*' element={
          loggedin ?  <Homepage/> : <LoginPage/> 
        }/>
          </Routes>
        
        
    </div>
  );
};
export default App;
