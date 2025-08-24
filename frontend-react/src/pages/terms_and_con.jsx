import {React} from "react";
import "./terms-and-con.css";

function TermsAndCon() {
    return (

            <div className="footer-pages">      
                        <h1>Terms & Conditions</h1>
                    <p><strong>Last updated: [24/08/2025]</strong></p>

                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By using this service (“the App”), you agree to these Terms & Conditions. 
                        If you do not agree, please do not use the App.
                    </p>

                    <h2>2. Use of the Service</h2>
                    <ul>
                        <li>The App allows you to upload, process, and download files (Excel, CSV, etc.).</li>
                        <li>You are fully responsible for the content of the files you upload.</li>
                        <li>You agree not to use the App for illegal, harmful, or unauthorized purposes.</li>
                    </ul>

                    <h2>3. Limitations</h2>
                    <p>
                        The App is provided “as is” without warranties of any kind. 
                        We are not responsible for data loss, conversion errors, or service downtime.
                    </p>

                    <h2>4. Intellectual Property</h2>
                    <p>
                        The code, design, and features of the App are the property of [Your Name / Company].
                        You may not copy, distribute, or modify them without prior consent.
                    </p>

                    <h2>5. Changes to Terms</h2>
                    <p>
                        We reserve the right to update these Terms at any time. 
                        Updates will be posted on this page.
                    </p>
            </div>
    );
}

export default TermsAndCon