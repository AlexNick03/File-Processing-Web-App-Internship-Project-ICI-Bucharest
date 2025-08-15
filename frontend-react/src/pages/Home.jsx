import React from "react";
import "./home.css";

function Home() {
    return (
       
            <div className = "main-home">
                <section className="hero">
                    <img 
                    src="/images/hero.jpeg" 
                    />
                </section>
            <div className="about-project">
                
                <h4>About Project</h4>
                <p>File Handler is an educational project developed during the internship at ICI Bucharest. The purpose of the application is to process and convert files in an efficient and secure manner.</p>

            </div>
            <div className = "about-tech">
                <h4>Technologies</h4>
                    
                    <ul>
                        <li>Frontend: HTML5, CSS3, JavaScript for a responsive and dynamic user interface.</li>
                        <li>Backend: Python with FastAPI to handle API endpoints efficiently and securely.</li>
                        <li>Deployment: Hosted on AWS for scalability and reliability.</li>
                    </ul>
                 
            </div>
        </div>
   
    );
}

export default Home