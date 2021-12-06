import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Axios from "./Axios";
import "./../styles/ProjectView.css";
import CommentCard from "./CommentCard";
  

const ProjectView = () => {

  //eslint-disable-next-line
  const { project_id } = useParams();
  
  var report_text = "";
  var useremail = useSelector((state) => state.login.username);
  var projects = useSelector((state) => state.login.projects);
  

  var comments = [];

   projects = projects.filter((project) => project._id === project_id); 
   comments =  projects[0].comments
 
  const handleReports = (e) => {
    e.preventDefault();
    if(report_text === ""){
      alert("please enter the report to submit")
    }
    else{
      Axios.post("/comment", { id: e.target.value, useremail: useremail ,comment:report_text}).then(
        (response) => {
          if(response.data.updated===true){
            alert("Report Submitted")
           document.getElementById("Bugreport").value = "";
          }
        }
      ).catch((err)=>{
        alert("error try again")
      })

    }
  }
  return (
    <>
      {
      projects.map((project) => {
        return (
          <div className="pv">
            <div className="pv-container">
              <div className="pv-title">
                <h3>{project.title}</h3>
              </div>
              <div className="pv-desc">
                <h3>Description</h3>
                <p>{project.title}</p>
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
                { comments.map((comment)=>{
                  console.log(comment)
                  return (
                    <CommentCard details = {comment} key={comment._id} project_id = {project._id}/>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default ProjectView;
