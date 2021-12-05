//library imports
import React, { useEffect } from "react";
import { Routes,Route , Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//style sheet
import "../styles/App.css";

//components
import Nav from "./Nav";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import LoginCard from "./LoginCard";
import SignUpCard from "./SignUpCard";
import ForgotPassword from "./ForgotPassword";
import ProjectList from "./ProjectsList"
import ProjectView from "./ProjectView";
import AddProject from "./AddProject";

const App = () => {
  // var username = useSelector((state)=>{
  //   return state.login.username
  // })
  const navigate = useNavigate();
  var loggedin = useSelector((state)=>state.login.setSignedin);
  useEffect(()=>{
    
    if(loggedin === false){
    navigate("/login")
    }
    else{
      navigate("/home/projects")
    }
  },[])
  
  return (
    <>
      <Nav/>
      <Routes>
          <Route path="/"  element = {<LoginPage/>}>
          <Route path="login" element = {<LoginCard/>}/>
          <Route path="signup" element ={<SignUpCard/>}/>
          <Route path ="forgotPassword" element = {<ForgotPassword/>}/>
        </Route>
        {loggedin ?
        <>
            <Route path="/home" element={<HomePage />}>
            <Route path="projects" element={<ProjectList />} />
            <Route path="myprojects" element={<ProjectList myprojects={true} />} />
            <Route path="projects/:project_id" element={<ProjectView/>} />
            <Route path="addProject"  element = {<AddProject/>}/>
            </Route><Route path="*" element={<><div>not found</div></>} />
        </> 
          :
           <Route path="/home" element={<Navigate to ="/login"/>}/>
         }
      </Routes>
    </>
  );
};
export default App;
