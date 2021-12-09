import React, { useState } from "react";
import Axios from "./Axios";
import { useNavigate } from "react-router-dom";
//styling
import "./../styles/Otp.css";

//image
import cardImage from "./../images/webLogoDark.svg";
import { useParams } from "react-router-dom";

const Otp = () => {
  const navigate = useNavigate();
  //states
  const { token } = useParams();
  const [newpwd, setNewpwd] = useState("");
  const [renewpwd, setRenewpwd] = useState("");

  //onchange otp

  //onchange new password
  const onchangenewpwd = (e) => {
    setNewpwd(e.target.value);
  };

  //onchange reenter password
  const onchangerenewpwd = (e) => {
    setRenewpwd(e.target.value);
  };
  //change password
  const handleSubmitbtn = (e) => {
    e.preventDefault();

    if (newpwd !== renewpwd) {
      alert("password does not match");
    } else {
      Axios.post(
        "/changepassword",
        { password: newpwd },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (response.data.updation) {
            alert("password changed");
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="fp-changepassword">
      <div className="fp-image">
        <img src={cardImage} alt="" />
      </div>

      <div className="fp-newPassword">
        <label htmlFor="Newpassword">New Password</label>
        <input
          type="password"
          placeholder="New Password"
          value={newpwd}
          onChange={onchangenewpwd}
        />
      </div>
      <div className="fp-renewPassword">
        <label htmlFor="Newpassword">Re-enter Password</label>
        <input
          type="password"
          placeholder="Re-enter Password"
          value={renewpwd}
          onChange={onchangerenewpwd}
        />
      </div>
      <div className="fp-submitbtn">
        <button onClick={handleSubmitbtn}>Submit</button>
      </div>
    </div>
  );
};

export default Otp;
