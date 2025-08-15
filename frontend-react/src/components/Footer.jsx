import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
function Footer() {
    
return (
        <footer class = "footer">
            <div class="footer-top">

            <div class="footer-links">
                <h4>Useful links</h4>
                <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/terms">Terms and conditions</a></li>
                <li><a href="/confs">Privacy Policy</a></li>
                </ul>
            </div>

            <div class="footer-contact">
                <h4>Contact</h4>
                <p>Email: alexniculae367@gmail.com</p>
                <p>National Institute for Research in IT - ICI Bucharest</p>
            </div>
        </div>

        <div class="footer-bottom">
            <p>© 2025 File Handler. Educational project – ICI Bucharest. All rights reserved</p>
        </div>
        </footer>

    )
}
export default Footer