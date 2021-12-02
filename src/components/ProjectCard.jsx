import React from "react";
import './../styles/ProjectCard.css';
const ProjectCard = (props) =>{
    return(
           <div className="card-container">
                <div className="project-card">
                <div className="project-title">
                    <h3>{props.details.title}</h3>
                </div>
                <div className="project-desc">
                    <p>{props.details.description}</p>
                </div>
                <div className="project-card-btns">
                    <button>view</button>
                    <button>submit report</button>
                </div>
            </div>
           </div>
    )
}
export default ProjectCard;