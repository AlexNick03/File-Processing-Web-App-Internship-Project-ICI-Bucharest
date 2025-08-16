import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar(){
    return (
        <nav class="navbar">
        
            <Link to = "/" class = "home-navigation" >
            
                <span className = "hover-wrapper">
                <img className="logo" src = "/images/logo.png" alt="logo"/>
                <span className = "home-text">Home</span>
                </span>
            
            </Link>
        
            <Link to = "/file-convertor" >
                <p>File Converter</p>
            </Link>
        
            <Link to = "/excel-navigation">
                <p>Excel CleanUp</p>
            </Link>
            <Link to = "/excel-navigation">
                <p>About me</p>
            </Link>
            
        </nav>
    )
}
export default Navbar