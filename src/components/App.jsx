//library imports
import React from "react";
import { Routes,Route,Navigate } from "react-router-dom";
//style sheet
import "../styles/App.css";

//components
import Nav from "./Nav";
import LoginPage from "./LoginPage";
import Homepage from "./HomePage";
import ProjectView from "./ProjectView";
import ProjectCard from "./ProjectCard";

const App = () => {
  return (
    <div className="container">
        <Nav/>
    </div>
  );
};
export default App;
