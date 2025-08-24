import {React} from "react";

function Privacy() {
    return (

        <div className="footer-pages">

            <h1>Privacy Policy</h1>
            <p><strong>Last updated: [date]</strong></p>

            <h2>1. Information We Collect</h2>
            <ul>
                <li>Files you upload for processing.</li>
                <li>Basic technical data (browser type, IP address) needed for the App to function.</li>
            </ul>

            <h2>2. How We Use Your Data</h2>
            <p>
                Uploaded files are used <strong>only for temporary processing</strong> 
                (e.g., conversion, sorting). Files may be automatically deleted after download.
            </p>

            <h2>3. Data Sharing</h2>
            <p>
                We do not sell, rent, or share your files or personal data with third parties. 
                Information may only be disclosed if required by law.
            </p>

            <h2>4. Security</h2>
            <p>
                We take reasonable measures to protect your data. 
                However, no online transmission or storage is 100% secure.
            </p>

            <h2>5. Your Rights</h2>
            <p>
                You may request deletion of your files at any time. 
                For questions, contact us at <a href="mailto:[your email]">[your email]</a>.
            </p>
        </div>

    )
}

export default Privacy