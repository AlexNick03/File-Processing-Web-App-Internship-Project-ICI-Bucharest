import React from "react";
import MainSection from "./components/MainSection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FileConvert from "./pages/FileConvert";
import ExcelCleanup from "./pages/ExcelCleanup";

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
      </Routes>
      </MainSection>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
