import React from "react";
import "./../styles/CommentCard.css";
import { useSelector } from "react-redux";
import Axios from "./Axios"
const CommentCard = (props) => {
  var email = "kiran.1905p6@gmail.com"


  const useremail = useSelector((state) => {
    return state.login.email;
  });

  const handleDelete= (e)=>{
    e.preventDefault();
    Axios.post("/deleteComment",{
      "project_id" :props.project_id,
      "comment_id" :props.details._id
    }).then((response)=>{
        console.log(response)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const handleMark =(e)=>{
    e.preventDefault();
    console.log("marked")
  }

  return (
    <div className="commentcard">
      <div className="commentcard-username">
        {props.details.user_name}
      </div>
      <div className="commentcard-report">
        {props.details.comment}
      </div>
      <div className="commentcardbtn">
        { 
          useremail === email ? (
          <>
            <button className="commentcard-resolvedbtn" onClick ={handleMark} >Mark resolved</button>
            <button className="commentcard-deletebtn" onClick = {handleDelete} >Delete</button>
          </>
          ) : (
          <>
            <button className="commentcard-deletebtn" onClick = { handleDelete } >Delete</button>
          </>
          )}
      </div>
    </div>
  );
};
export default CommentCard;
