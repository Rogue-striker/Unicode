import React ,{useState} from "react";
import   "./../styles/CommentCard.css";
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
  //var project is a object
  var project = projects.filter((pro) => pro._id === props.project_id); 
  const handleDelete= (e)=>{
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("accesstoken"))
    Axios.post("/deleteComment",{
      "project_id" :props.project_id,
      "comment_id" :props.details._id
    },{
      headers:{
      'authorization':`Bearer ${token.accesstoken}`
  }}).then((response)=>{
        var new_projects =[...projects]
        let index = projects.findIndex((p)=>p._id ===props.project_id);
        //console.log(index);
        if(index!=-1){
          new_projects.splice(index,1);
          new_projects.push(response.data);
          dispatch(setProjects(new_projects))
        }
    
    }).catch((err)=>{
      console.log(err)
    })
  }

  const handleMark =(e)=>{
    e.preventDefault();
    Axios.post("/projectsolved",{id:props.project_id,comment_id:props.details._id}).then((response)=>{
      if(response.data.solved===true){
         setResolved(true)   
      }
    }).catch((err)=>{
      console.log(err)
    })
     
  }
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
        (useremail === props.details.user_email) ?( <>
          <button className="commentcard-deletebtn" onClick = { handleDelete } >Delete</button>
        </>
        ) : (
          <>
         {(useremail === project[0].user_email) &&  
 <button  className={resolved ? "commentcard-resolvedbtn-solved" :"commentcard-resolvedbtn"} onClick ={handleMark} >Mark resolved</button>
          }
          </>
        )
      }
      </div>
    </div>
  );
};
export default CommentCard;
