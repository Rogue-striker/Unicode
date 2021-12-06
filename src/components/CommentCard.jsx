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
      "project_id" :123,
      "comment_id" :123
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
        username
      </div>
      <div className="commentcard-report">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore,
        fugit!
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
