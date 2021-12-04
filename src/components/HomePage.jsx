//libraries
import React from "react";
import {  useSelector } from "react-redux";
import { Outlet, NavLink } from "react-router-dom";
//styling
import "./../styles/HomePage.css";

//components

const HomePage = () => {
  // const handleSearch = (e)=>{
  //   e.preventDefault();
  //   projects.filter((project)=>{
  //     console.log(project.details.title)
  //   })
  // }
  // const handleSearchText = (e)=>{
  //   setSearchText(e.target.value);
  // }
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
        </div>
      </div>
      <div className="homepage-right">
        <div className="projects">
          <div className="welcome-title">
            <p>Welcome {username}!</p>
          </div>
          {/* <div className="projects-list">
            {projects.map((project) => (
              <ProjectCard details={project} key={project._id} />
            ))} 
          </div> */}
          <Outlet />
        </div>
      </div>
    </div>
  );


  {
    /* 
            <div className="projects-search">
                <input type="text" placeholder="Search" onChange={handleSearchText}   />
                <button onClick={handleSearch}>Search</button>
            </div> */
  }
};
export default HomePage;

