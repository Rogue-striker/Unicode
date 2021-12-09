import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Axios from "./Axios";
import "./../styles/ProjectView.css";
import CommentCard from "./CommentCard";
import {setProjects} from "./../features/LoginReducer"

const ProjectView = () => {
  const dispatch = useDispatch()
  //eslint-disable-next-line
  const { project_id } = useParams();
  var report_text = "";
  var useremail = useSelector((state) => state.login.email);
  var projects = useSelector((state) => state.login.projects);
  var project = projects.filter((project) => project._id === project_id); 

  const handleReports = (e) => {
    e.preventDefault();
    if(report_text === ""){
      alert("please enter the report to submit")
    }
    else{
      const token = JSON.parse(localStorage.getItem("accesstoken"))
      Axios.post("/comment", { id: e.target.value, useremail: useremail ,comment:report_text},{headers:{
        'authorization':`Bearer ${token.accesstoken}`
    }}).then(
        (response) => {
          if(response.data.updated===true){
           
          var new_projects = projects.filter((project)=>{return true})
          let index = projects.findIndex((project)=>project._id ===project_id );
          if(index!=-1){
            new_projects.splice(index,1);
            new_projects.push(response.data.project);
            
          }
          dispatch(setProjects(new_projects))
           document.getElementById("Bugreport").value = "";
          }
        }
      ).catch((err)=>{
        console.log(err)
      }
      )

    }
  }
  return (
    <>
      {
      project.map((project) => {
        return (
          <div className="pv">
            <div className="pv-container">
              <div className="pv-title">
                <h3>{project.title}</h3>
              </div>
              <div className="pv-desc">
                <h3>Description</h3>
                <p>{project.description}</p>
              </div>
              <div className="pv-link">
                <p> <b>Link</b> : {project.project_link}</p>
              </div>
              <div className="pv-report-submit">
                <div className="pv-report-submit-details">
                  <label htmlFor="report">Submit Report :</label>
                  <textarea
                    name="report"
                    id="Bugreport"
                    onChange={(e) => (report_text = e.target.value)}
                    placeholder = "Enter your report"
                  ></textarea>
                </div>
                <div className="pv-report-submit-btn">
                  <button onClick={handleReports} value={project._id}>
                    Submit
                  </button>
                </div>
              </div>
              <div className="pv-report-list">
                <div className="pv-report-title">
                  <h3>Reports</h3>
                </div>
                {
                     Object.keys(projects).map((key)=>{
                       return projects[key].comments.map((comment)=>{
                        return (
                          <CommentCard details = {comment} key={comment._id} project_id = {project._id}/>
                        );
                        
                      })
                  })

                }
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default ProjectView;
