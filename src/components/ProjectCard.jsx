import React from "react";
import './../styles/ProjectCard.css';
const ProjectCard = () =>{
    return(
           <div className="card-container">
                <div className="project-card">
                <div className="project-title">
                    <h3>Title</h3>
                </div>
                <div className="project-desc">
                    <p>Lorem ipsum, dolor sit amet consectetur
                     adipisicing elit. Optio, eveniet
                     Lorem ipsum dolor sit amet, consectetur
                      adipisicing elit. Hic, nulla delectus 
                      voluptatum ab dolorum magni sit, re
                      iciendis, magnam nobis ex voluptas minus rem harum ducimus. Recusandae aut tenetur optio excepturi.
                     .</p>
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