import React from "react";
import MainSection from "./components/MainSection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FileConvert from "./pages/FileConvert";
import ExcelCleanup from "./pages/ExcelCleanup";
import TermsAndCon from "./pages/terms_and_con";
import Privacy from "./pages/privacy";
import AboutMe from "./pages/AboutMe";  
function App() {
  return (
    <div className="page-wrapper">
    <Router>
      <Navbar />
      <MainSection>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/file-convertor" element={<FileConvert />} />
        <Route path="/excel-navigation" element={<ExcelCleanup />} />
        <Route path="/about-me-navigation" element={<AboutMe/>} />
        <Route path="/terms" element={<TermsAndCon />} />
        <Route path="/confs" element={<Privacy />} />

      </Routes>
      </MainSection>
      <Footer>
      
      </Footer>
    </Router>
    </div>
  );
}

export default App;
