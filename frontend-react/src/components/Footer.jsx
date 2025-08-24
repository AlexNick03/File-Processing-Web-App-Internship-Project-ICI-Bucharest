import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
function Footer() {
    
return (
        <footer className = "footer">
            <div className="footer-top">

            <div className="footer-links">
                <h4>Useful links</h4>
                <ul>
                <li><Link to ="/">Home</Link></li>
                <li><Link to="/terms">Terms and conditions</Link></li>
                <li><Link to="/confs">Privacy Policy</Link></li>
                </ul>
            </div>

            <div className="footer-contact">
                <h4>Contact</h4>
                <p>Email: alexniculae367@gmail.com</p>
                <p>National Institute for Research in IT - ICI Bucharest</p>
                <p>Also visit my GitHub profile: <Link to ="https://github.com/AlexNick03">https://github.com/AlexNick03</Link></p>
                
            </div>
        </div>

        <div className="footer-bottom">
            <p>© 2025 File Handler. Educational project – ICI Bucharest. All rights reserved</p>
        </div>
        </footer>

    )
}
export default Footer