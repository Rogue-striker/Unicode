import React from "react";
import { useNavigate,  } from "react-router";
import './../styles/ProjectCard.css';
const ProjectCard = (props) =>{
    const navigate = useNavigate()
    const handleView = (e)=>{
        e.preventDefault();
        navigate(`/home/projects/${props.details._id}`)
    }
    const handleDelete = (e)=>{
        e.preventDefault(e);
        console.log("button pressed")
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
                    {props.deletebtn ? <><button className="project-card-deletebtn" onClick={handleDelete}>Delete</button></> :""}
                </div>
            </div>
           </div>
    )
}
export default ProjectCard;