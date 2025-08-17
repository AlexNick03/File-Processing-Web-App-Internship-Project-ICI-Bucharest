import React, { use } from "react";
import "./excel.css";
import { useState, useEffect} from "react";

function Excel() {

  const [animate, setAnimate] = useState(false);
  const [excelFile, setExcelFile] = useState(null);
  const [cleanupOption, setCleanupOption] = useState("");
  const [loading, setLoading] = useState(false);
  const handleFileUpload = (e) => {
    setExcelFile(e.target.files[0]);
    setCleanupOption("")
  };

  const handleCleanup = (e) => {
    setCleanupOption(e.target.value);
  };
  let message = "Please select the type of the file that you want to clean up";
  let image = "/images/excel-pickup.png";
 if (excelFile && !cleanupOption) {
    message = "Please select the option you want to perform";
    image = "/images/option.png";
  } else if (cleanupOption && excelFile) {
      message = `Ready to clean up  ${excelFile.name}`;
    image = "/images/ready.png"; 
  }

  
  useEffect (() => {
    setAnimate(false);
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [message, image]);

  let endpoint = " ";
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!excelFile || !cleanupOption) return alert("Please select a file and a cleanup option.");
    if (cleanupOption === "remove-empty-rows") endpoint = "/remove-empty-rows/";
    else if (cleanupOption === "remove-empty-columns") endpoint = "/remove-empty-columns/";
    else if (cleanupOption === "trim-spaces") endpoint = "/trim-spaces/";
    setLoading(true);
    
    setLoading(false);
  };
  return (
    <div className="excel-cleanup">
      <h2>Excel Cleanup</h2>
      {/* Animation panel */}
        <div className="animation-panel">
          <h4 className={`convert-instruction ${animate ? "show-text" : ""}`}>
            {message}
          </h4>
          <img
            src={image}
            alt="step illustration"
            className={`choice-image ${animate ? "show-image" : ""}`}
          />
        </div>
      <form id="convert-form" onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="cleanup-option">Operatons:</label>
        <select 
        value={cleanupOption}
        onChange={handleCleanup}
        required
        id="cleanup-option">
          <option value="">Select Option</option>
          <option value="csv_to_excel">Convert CSV → Excel</option>
          <option value="excel_to_csv">Convert Excel → CSV</option>
          <option value="split_files">Split Files</option>
          <option value="sort_alpha">Sort Data - Alphabetical (by columns)</option>
          <option value="sort_asc">Sort Data - Ascending (by columns)</option>
          <option value="sort_desc">Sort Data - Descending  (by columns)</option>
          <option value="filter_dropna">Filter Data - Drop NA (Remove missing values)</option>
         
        </select>
      </div>
        <div className="form-group">
          <label htmlFor="excel-file">Upload Excel File:</label>
          <input 
          type="file" 
          disabled={!cleanupOption}
          className="excel-file" 
          accept=".xlsx, .xls, .csv" 
          onChange={handleFileUpload}
          />
        </div>

      

      <button className={cleanupOption? "cleanup-btn" : "cleanup-btn-disabled"} disabled={!cleanupOption}>Clean File</button>
      {loading && (
            <div className="loading-overlay">
                <div className="spinner"></div>
            </div>
        )}
    </form>
    </div>
  );
}

export default Excel;