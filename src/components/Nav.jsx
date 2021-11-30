import React, { useState } from "react";
import "./../styles/Nav.css";
import Logo from "./../images/webLogoDark.svg";
import { Link } from "react-router-dom";
const Nav = () => {
	var loggedin = true;
	return (
		<div className="navBar">
			<div className="navBar-logo">
				<div className="navBar-icon">
					<img src={Logo} alt="" />
				</div>
				<div className="navBar-title">
					<h2>
						{" "}
						<a href="/">UNICODE</a>{" "}
					</h2>
				</div>
			</div>
			{loggedin ? (
				<div className="navBar-right">
					<div className="navBar-login">
						<Link to="/login">
							<button className="navBar-loginbtn">Login</button>{" "}
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
						<Link to="/logout">
							<button className="navBar-logoutbtn">Log Out</button>{" "}
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default Nav;
