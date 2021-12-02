import React from 'react'
import "./../styles/ProjectView.css"
const ProjectView = (props)=>{
    return(
        <div className="pv">
                <div className="pv-container">
                    <div className="pv-title">
                        <h3>Title</h3>
                    </div>
                    <div className="pv-desc">
                        <h3>Description</h3>
                        <p>Lorem ipsum, dolor sit amet 
                        consectetur adipisicing elit. Incidunt, 
                        dolorem?
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint obcaecati dolorem corrupti nihil, esse nostrum ipsum, saepe, consectetur similique totam ab beatae impedit iste. Voluptates vel sed eligendi, error veritatis delectus ducimus natus amet illum, labore distinctio, nisi hic impedit!
                        </p>
                    </div>
                    <div className="pv-link">
                        <p>Link:www.people.com </p>
                    </div>
                    <div className="pv-report-submit">
                        <div className="pv-report-submit-details">
                            <label htmlFor="report">Submit Report :</label>
                            <textarea name="report" id="Bugreport" cols="30" rows="10"></textarea>
                        </div>
                        <div className="pv-report-submit-btn">
                            <button>Submit</button>
                        </div>
                    </div>
                    <div className="pv-report-list">
                        comments
                    </div>
                </div>
        </div>
    )
}
export default ProjectView;