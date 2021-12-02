//libraries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//styling
import "./../styles/HomePage.css";

//components
import { setProjects } from "../features/LoginReducer";
import Axios from "./Axios";
import ProjectCard from "./ProjectCard";
import ProjectView from "./ProjectView";

const HomePage = () => {
  const projects = useSelector((state) => state.login.projects);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    Axios.get("/projects").then((response) => {
      console.log(response.data);
      dispatch(setProjects(response.data));
    });
  }, []);
  // const handleSearch = (e)=>{
  //   e.preventDefault();
  //   projects.filter((project)=>{
  //     console.log(project.details.title)
  //   })
  // }
  // const handleSearchText = (e)=>{
  //   setSearchText(e.target.value);
  // }

  return (
    <div className="homepage">
      <div className="homepage-left">
        <div className="homepage-navbar">
          <div className="homepage-navbar-item active">
            <h3>
              <a href="/home">Home</a>
            </h3>
          </div>
          <div className="homepage-navbar-item">
            <h3>
              <a href="/myprojects">My Projects</a>
            </h3>
          </div>
        </div>
      </div>
      <div className="homepage-right">
        <div className="projects">
          <div className="welcome-title">
            <p>Welcome Name!</p>
          </div>
          {/* 
                    <div className="projects-search">
                        <input type="text" placeholder="Search" onChange={handleSearchText}   />
                        <button onClick={handleSearch}>Search</button>
                    </div> */}
          <div className="projects-list">
            {projects.map((project) => (
              <ProjectCard details={project} key={project._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
