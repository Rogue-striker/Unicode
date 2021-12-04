import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./../styles/HomePage.css";
import { setProjects } from "../features/LoginReducer";
import Axios from "./Axios";
import ProjectCard from "./ProjectCard";
const ProjectList = (props) => {
  var myprojects = false;
  if (props.myprojects) {
    myprojects = props.myprojects;
  }
  const projects = useSelector((state) => state.login.projects);
  const email = useSelector((state)=>state.login.email)
  const dispatch = useDispatch();
  useEffect(() => {
    Axios.get("/projects").then((response) => {
      dispatch(setProjects(response.data));
    });
  }, []);

  return (
    <>
      {myprojects ? (
        <>
          <div className="projects-list">
            {projects.map((project) => {
                if(project.user_email === email){
                    return <ProjectCard details={project} key={project._id} deletebtn={true}/>;
                }
            })}
          </div>
        </>
      ) : (
        <div className="projects-list">
          {projects.map((project) => (
            <ProjectCard details={project} key={project._id} />
          ))}
        </div>
      )}
    </>
  );
};
export default ProjectList;
