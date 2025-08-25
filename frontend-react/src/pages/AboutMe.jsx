import React from "react";
import "./about-me.css";
function AboutMe() {
  return (
    
    <div className="about-container">
     <div className="about-me card">
      <div className="about-information"><h2>About Me</h2>
          <p>
            Hi, I’m <span className="highlight">Niculae George-Alexandru </span>  
            I am an ambitious person, passionate about technology and eager to grow 
            in a professional environment. My goal is to constantly improve my skills 
            and contribute to meaningful projects.
          </p>
          <p>
            On a personal level, I enjoy meeting new people, staying active through sports, 
            spending time in nature, and of course having a good barbecue with friends.
          </p>
      </div>

      <div className="about-photo">
        <img src="/images/me.jpg" alt="My portrait" />
      </div>
    </div>

    <div className="about-studies card">
      <div className="about-emblem">
        <img src="/images/university.png" alt="University emblem" />
      </div>

      <div className="studies">
        <h2>Studies</h2>   
      
    
        <p>
            I am currently in the final year of a four-year program at  
            <strong> University Politehnica of Bucharest (UNSTB)</strong>, 
            within the Faculty of Industrial Engineering and Robotics, specializing in 
            <strong> Industrial Informatics</strong>.
        </p>

        <p>
            Throughout this program, I have gained a strong foundation in software engineering, 
            while also exploring a variety of fields such as web development, robotics, 
            signal processing, and related technologies. This experience has allowed me 
            to develop both technical knowledge and problem-solving skills that I am eager 
            to apply in real-world projects.
        </p>
        
      </div>
    </div>
      <div className="about-skills card">
        <h2>About My Skills</h2>
        <div className="skills-grid">
            <div className="skill-card soft-skills">
              <h3>Soft Skills</h3>
              <ul>
                <li>Problem Solving</li>
                <li>Critical Thinking</li>
                <li>Teamwork & Collaboration</li>
                <li>Effective Communication</li>
              </ul>
            </div>

            <div className="skill-card technical-skills">
              <h3>Programming Languages</h3>
              <ul>
                <li>Python</li>
                <li>Java</li>
                <li>C++</li>
                
              </ul>
            </div>

            <div className="skill-card frameworks-skills">
              <h3>Web Frameworks and other skills</h3>
              <ul>
                <li>Django, FastAPI</li>
                <li>React (JavaScript)</li>
                <li>HTML, CSS, JavaScript</li>
                <li>SQL</li>
                <li>Data science concepts</li>
                <li>Realational databases</li>
                <li>Non relational databases</li>
                
              </ul>
            </div>

            <div className="skill-card tools-skills">
              <h3>Tools</h3>
              <ul>
                <li>Git/GitHub Desktop</li>
                <li>Visual Studio Code</li>
                <li>Postman</li>
                <li>AutoCad</li>
                <li>SolidWorks</li>
                <li>MS Office</li>
                
              </ul>
            </div>
        </div>
      </div>
    <div className="about-links card">
      <div className="about-links">
            <h2>Links</h2>
            <p>When I’m not coding, you can usually find me learning new technologies, experimenting with UI/UX ideas, or enjoying a good coffee.</p>
            <div className="links">
            <a href="https://github.com/AlexNick03" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/alex-niculae-5313631ba/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto: alexniculae367@gmail">Email Me</a>
            </div>
      </div>
    </div>
  </div>

    
  );
}

export default AboutMe;