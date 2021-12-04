import React from "react";
import { useNavigate,  } from "react-router";
import './../styles/ProjectCard.css';
const ProjectCard = (props) =>{
   
    const navigate = useNavigate()

    const handleView = (e)=>{
        e.preventDefault();

 navigate(`/home/projects/${props.details._id}`)
    }
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
                    <button onClick={handleView}>view</button>
                </div>
            </div>
           </div>
    )
}
export default ProjectCard;