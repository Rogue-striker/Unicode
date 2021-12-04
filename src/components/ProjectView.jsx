import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Axios from "./Axios";
import "./../styles/ProjectView.css";
import CommentCard from "./CommentCard";

const ProjectView = () => {
  // eslint-disable-next-line

  var report_text = "";
  var useremail = useSelector((state) => state.login.username);
  var projects = useSelector((state) => state.login.projects);
  const { project_id } = useParams();
  const comments = []
  projects = projects.filter((project) => project._id === project_id);

  const handleReports = (e) => {
    e.preventDefault();
    Axios.post("/comment", { _id: e.target.value, useremail: useremail }).then(
      (response) => {
        console.log(response);
      }
    );
  };
  return (
    <>
      {projects.map((project) => {
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
                {comments.map((comment) => (
                  <CommentCard />
                ))}

                {/* {project.comments.map((comment)=><CommentCard/>)}
                 */}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default ProjectView;
