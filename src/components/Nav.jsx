import React from "react";
import { useSelector ,useDispatch} from "react-redux";
import { useNavigate, Link  } from "react-router-dom";
import { updateLogin } from "../features/LoginReducer";
import "./../styles/Nav.css";
import Logo from "./../images/webLogoDark.svg";

const Nav = () => {
	var loggedin = useSelector((state)=>state.login.setSignedin);
	const navigate = useNavigate();
	
	//dispatcher
	const dispatch = useDispatch();

	//handle logout 	
	const handleLogout = (e)=>{
		e.preventDefault();
		dispatch( updateLogin(false));
		localStorage.removeItem("token")
		localStorage.removeItem("accesstoken")
		navigate("/login");
	}

	return (
		<div className="navBar">
			<div className="navBar-logo">
				<div className="navBar-icon">
					<img src={Logo} alt="" />
				</div>
				<div className="navBar-title">
					<h2>
						<Link to={loggedin ? "/home/projects" : "/"}>
							UNICODE
						</Link>
						
					</h2>
				</div>
			</div>
			{!loggedin ? (
				<div className="navBar-right">
					<div className="navBar-login">
						<Link to="/login">
							<button className="navBar-loginbtn">Login</button>
						</Link>
					</div>
					<div className="navBar-signup ">
						<Link to="/signup">
							<button className="navBar-signupbtn">Sign Up</button>
						</Link>
					</div>
				</div>
			) : (
				<div className="navBar-right">
					<div className="navBar-login">
						
							<button className="navBar-logoutbtn" onClick={handleLogout}>Log Out</button>
					
					</div>
				</div>
			)}
		</div>
	);
};

export default Nav;
