import React from "react";
import './../styles/HomePage.css'
import ProjectCard from './ProjectCard';
import ProjectView from './ProjectView'

const HomePage = ()=>{
    const name = "user name"
    return(
      <div className="homepage">
          <div className="homepage-left">
                <div className="homepage-navbar">
                    <div className="homepage-navbar-item active">
                                <h3><a href="#">Home</a></h3>                 
                    </div>
                    <div  className="homepage-navbar-item">
                                <h3>My Projects</h3>
                    </div>
                </div>
          </div>
          <div className="homepage-right">
              <div className="projects">
                    <div className="welcome-title">
                      <p>Welcome {name}!</p>
                    </div>
                    <div className="projects-search">
                        <input type="text" placeholder="Search" />
                        <button>Search</button>
                    </div>
                    <ProjectView/>
                    {/* <div className="projects-list">
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                          <ProjectCard/>
                    </div> */}
              </div>
          </div>
      </div>
    )
}
export default HomePage;