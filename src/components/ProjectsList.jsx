import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./../styles/HomePage.css";
import { setProjects } from "../features/LoginReducer";
import Axios from "./Axios";
import ProjectCard from "./ProjectCard";

const ProjectList = (props) => {
  var myprojects = false;
  var projects = useSelector((state) => state.login.projects);
  const email = useSelector((state) => state.login.email);
  const dispatch = useDispatch();
  if (props.myprojects) {
    myprojects = props.myprojects;
    projects = projects.filter((project) => {
      return project.user_email === email;
    });
  }
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("accesstoken"));
    Axios.get("/projects", {
      headers: {
        authorization: `Bearer ${token.accesstoken}`,
      },
    })
      .then((response) => {
        return dispatch(setProjects(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {myprojects ? (
        <>
          <div className="projects-list">
            {projects.map((project) => (
              <ProjectCard
                details={project}
                key={project._id}
                deletebtn={true}
              />
            ))}
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
