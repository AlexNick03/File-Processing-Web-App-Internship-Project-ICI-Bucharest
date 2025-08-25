import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar(){
    return (
        <nav className="navbar">
        
            <Link to = "/" className = "home-navigation" >
            
                <span className = "hover-wrapper">
                <img className="logo" src = "/images/logo.png" alt="logo"/>
                <span className = "home-text">Home</span>
                </span>
            
            </Link>
        
            <Link to = "/file-convertor" >
                <p>File Converter</p>
            </Link>
        
            <Link to = "/excel-navigation">
                <p>Excel Operations</p>
            </Link>
            <Link to = "/about-me-navigation/">
                <p>About me</p>
            </Link>
            
        </nav>
    )
}
export default Navbar