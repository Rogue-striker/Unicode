import React from "react";
import { useNavigate } from "react-router";
import "./../styles/AddProject.css";
import Axios from "./Axios";
import { useSelector } from "react-redux";
const AddProject = () => {
  var projectTitle = "";
  var projectDesc = "";
  var projectLink = "";
  const userEmail = useSelector((state)=>state.login.email)
  const navigate = useNavigate();
  const handleAddButton = (e) => {
    e.preventDefault();
   const token =  JSON.parse(localStorage.getItem("accesstoken"))
    if (projectLink === "" || projectTitle === "" || projectDesc === "") {
      alert("Enter all details");
    } else {
      Axios.post("/addproject", {
        user_email:userEmail,
        title: projectTitle,
        description: projectDesc,
        project_link: projectLink,
      },
      {
        headers:{
          'authorization':`Bearer ${token.accesstoken}`
         }
        } 
    ).then((response) => {
          if (response.data.added) {
            alert("project Added");
            navigate("/home/myprojects");
          }
          if(response.data.exists){
              alert("project already exits")
          }
          
        })
        .catch((err) => {
          console.log(err)
          alert("error try again");
        });
       
    }
  };
  return (
    <div className="project">
      <div className="project-title">
        <label htmlFor="projectTitle">Project Title *</label>
        <input
        name="projectTitle"
          type="text"
          placeholder="Enter Project Title"
          onChange={(e) => (projectTitle = e.target.value)}
        />
      </div>
      <div className="project-description">
        <label htmlFor="projectDes">Description *</label>
        <textarea
          name="description"
          placeholder="Enter Project Description"
          onChange={(e) => (projectDesc = e.target.value)}
        ></textarea>
      </div>
      <div className="project-link">
        <label htmlFor="projectLink">Link *</label>
        <input
          name="link"
          type="text"
          placeholder="Enter the Link"
          onChange={(e) => (projectLink = e.target.value)}
        />
      </div>
      <div className="Addbutton">
        <button onClick={handleAddButton}>Add Project</button>
      </div>
    </div>
  );
};

export default AddProject;
