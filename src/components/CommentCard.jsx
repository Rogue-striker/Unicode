import React ,{useState} from "react";
import  styles from "./../styles/CommentCard.css";
import { useSelector ,useDispatch} from "react-redux";
import Axios from "./Axios"
import { setProjects } from "../features/LoginReducer";



const CommentCard = (props) => {

 const [resolved,setResolved] = useState(props.details.solved)
const dispatch = useDispatch();
  const useremail = useSelector((state) => {
    return state.login.email;
  });
  var projects = useSelector((state) => state.login.projects);
  console.log(projects)
  var project = projects.filter((pro) => pro._id === props.project_id); 
  const handleDelete= (e)=>{
    e.preventDefault();
    console.log("before axios")
    Axios.post("/deleteComment",{
      "project_id" :props.project_id,
      "comment_id" :props.details._id
    }).then((response)=>{
        console.log(response)
        var new_projects =[...projects]
        console.log(new_projects)
        let index = projects.findIndex((project)=>project._id ===props.project_id );
        console.log(index);
        if(index!=-1){
          new_projects.splice(index,1);
          new_projects.push(response.data.project);
          console.log(new_projects)
        }
        console.log(new_projects)
      //  dispatch(setProjects(new_projects))
    }).catch((err)=>{
      console.log(err)
    })
  }

  const handleMark =(e)=>{
    e.preventDefault();
    Axios.post("/projectsolved",{id:props.project_id,comment_id:props.details._id}).then((response)=>{
      if(response.data.solved===true){
         console.log("Marked resolved",props.details._id)
      }
    })
    setResolved(true)    
  }
  console.log("status",props.details.solved)
  return (
    <div  className = {resolved ? "commentcard-solved" : "commentcard"}>
      <div className="commentcard-username">
       <h4>Name</h4> 
        <p>{props.details.user_name}</p>
      </div>
      <div className="commentcard-report">
       <h4>Report</h4>
       <p >
        {props.details.comment}
       </p>
      </div>
      <div className="commentcardbtn">
        { 
          useremail === props.details.useremail ? (
          <>
           <button className="commentcard-deletebtn" onClick = { handleDelete } >Delete</button>
          </>
          ) : (
          <>
           <button  className={resolved ? "commentcard-resolvedbtn-solved" :"commentcard-resolvedbtn"} onClick ={handleMark} >Mark resolved</button>
            <button className="commentcard-deletebtn" onClick = {handleDelete} >Delete</button>
          </>
          )}
      </div>
    </div>
  );
};
export default CommentCard;
