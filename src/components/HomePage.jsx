//libraries
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, NavLink } from "react-router-dom";

//styling
import "./../styles/HomePage.css";



const HomePage = () => {
  const username = useSelector((state) => state.login.username);
  return (
    <div className="homepage">
      <div className="homepage-left">
        <div className="homepage-navbar">
          <NavLink
            to="/home/projects"
            className="homepage-navbar-item"
            activeClassName="active"
          >
            Home
          </NavLink>
          <NavLink
            className="homepage-navbar-item"
            activeClassName="active"
            to="/home/myprojects"
          >
            My Projects
          </NavLink>

          <NavLink
          
            className="homepage-navbar-item"
           
            to="/home/addproject"
          >
            Add Project
          </NavLink>
        </div>
      </div>
      <div className="homepage-right">
        <div className="homepage-navbar-item-active">
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
