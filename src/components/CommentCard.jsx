import React from "react";
import "./../styles/CommentCard.css";
import { useSelector } from "react-redux";
const CommentCard = (props) => {
  const email = "kiran.1905p6@gmail.com"
  const useremail = useSelector((state) => {
    return state.login.email;
  });
  return (
    <div className="commentcard">
      <div className="commentcard-report">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore,
        fugit!
      </div>
      <div className="commentcardbtn">
        {useremail === email ? (
          <>
            <button className="commentcard-resolvedbtn">Mark resolved</button>
            <button className="commentcard-deletebtn">Delete</button>
          </>
        ) : (
          <>
            <button className="commentcard-deletebtn">Delete</button>
          </>
        )}
      </div>
    </div>
  );
};
export default CommentCard;
