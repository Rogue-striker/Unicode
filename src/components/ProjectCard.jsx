import React from "react";
import { useNavigate} from "react-router";
import { useSelector,useDispatch } from "react-redux";
import './../styles/ProjectCard.css';
import Axios from "./Axios";
import { setProjects } from "../features/LoginReducer";
const ProjectCard = (props) =>{
    var projects = useSelector((state)=>
        state.login.projects
    )
   const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleView = (e)=>{
        e.preventDefault();
        navigate(`/home/projects/${props.details._id}`)
    }
    const handleDelete = (e)=>{
        e.preventDefault(e);
        Axios.post("/deleteProject",{
            id:props.details._id,
           user_email :props.details.user_email
        }).then((response)=>{
            if(response.data.removed){
                projects = projects.filter((project)=>project._id !==props.details._id)
                dispatch(setProjects(projects))
            }
            if(response.data.found === false){
                alert("project not found!!!...")
            }
        })
        .catch((err)=>{
            console.log(err)
        })
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