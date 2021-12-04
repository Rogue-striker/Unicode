//libraries
import React from "react";
import {  useSelector } from "react-redux";
import { Outlet, NavLink } from "react-router-dom";


//styling
import "./../styles/HomePage.css";

//components

const HomePage = () => {
 const username = useSelector((state)=>state.login.username);
  return (
    <div className="homepage">
      <div className="homepage-left">
        <div className="homepage-navbar">
          <div className="homepage-navbar-item">
            <NavLink to="/home/projects">Home</NavLink>
          </div>
          <div className="homepage-navbar-item">
          <NavLink to="/home/myprojects">My Projects</NavLink>
          </div>
          <div className="homepage-navbar-item">
          <NavLink to="/home/addproject">Add Project</NavLink>
          </div>
        </div>
      </div>
      <div className="homepage-right">
        
        <div className="projects">
          <div className="welcome-title">
            <p>Welcome {username}!</p>
            
          </div>
       
  
          <Outlet />
        </div>
        
      </div>
    </div>
  );



};
export default HomePage;

