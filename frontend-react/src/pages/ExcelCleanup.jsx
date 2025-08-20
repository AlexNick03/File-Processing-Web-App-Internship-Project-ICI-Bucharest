import React from "react";
import "./excel.css";
import { useState, useEffect} from "react";

function Excel() {
  const secondOptionMap = {
    default: [false, "null"],
    "csv_to_excel": [false, "null"],
    "excel_to_csv": [false, "null"],
    "split_files": [false, "null"],
    "sort_alpha": [true,"column_index"],
    "sort_asc": [true,"column_index"],
    "sort_desc": [true,"column_index"],
    "merge_files": [false,"null"],
    "filter_dropna" : [false, "null"],
  }
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");
  const [animate, setAnimate] = useState(false);
  const [excelFile, setExcelFile] = useState(null);
  const [loading, setLoading] = useState(false);
  
   const handleFirstOption = (e) => {
    setFirstOption(e.target.value);
    setSecondOption("")
    setExcelFile(null);
  };
  const handleSecondOption = (e) => {
    setSecondOption(e.target.value);
    setExcelFile(null);
  }

 const handleFileUpload = (e) => {
    setExcelFile(e.target.files[0]);
    
  };
  let message = "Pleas select the option you want to perform";
  let image = "/images/option.png";
 if (firstOption && secondOptionMap[firstOption][0] && !secondOption) {
    message = "Please insert the column number you want to sort by";
    image = "/images/option.png";
  } else if ((firstOption && !secondOptionMap[firstOption][0])|| (firstOption && secondOptionMap[firstOption][0] && secondOption)) {
      message = `Ready to perform ${firstOption} on  ${excelFile.name}`;
    image = "/images/ready.png"; 
  }

  
  useEffect (() => {
    setAnimate(false);
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [message, image]);

  let endpoint = "";
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!excelFile || !firstOption) return alert("Please select a file and a cleanup option.");
    if (firstOption  === "csv-to-excel") endpoint = "/csv-to-excel/";
    else if (firstOption === "excel-to-csv") endpoint = "/excel-to-csv/";
    else if (firstOption === "merge-excel") endpoint = "/merge-excel/";
    else if (firstOption === "split-files") endpoint = "/split-files/";
    else if (firstOption === "sort-alpha") endpoint = "/sort-alpha/";
    else if (firstOption === "sort-asc") endpoint = "/sort-asc/";
    else if (firstOption === "sort-desc") endpoint = "/sort-desc/";
    else if (firstOption === "filter-dropna") endpoint = "/filter-dropna/";
    else return alert("Conversion not supported.");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", excelFile);

    try {
      const response = await fetch(`http://localhost:8000` + endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Conversion failed");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const extension = firstOption === "excel-to-csv" ? ".csv" : ".xlsx";
      a.download = excelFile.name.split(".")[0] + extension;
      document.body.appendChild(a);
      a.click();
      a.remove();
      
    } catch (error) {
      console.error("Error during conversion:", error);
    } finally {
      setLoading(false);
      setExcelFile(null);
      setFirstOption("");
      setSecondOption("");
    }
  
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
          <label htmlFor="first-option">Operatons:</label>
          <select 
          name = "first-option"
          value={firstOption}
          onChange={handleFirstOption}
          required
          id="first-option">
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
          {firstOption && secondOptionMap[firstOption][0] === true ? (
            <div className="form-group">
              <label htmlFor="second-option">Select index of the column to perform th Operaton:</label>

                <select
                value={secondOption}
                onChange={handleSecondOption}
                required
                id="second-option"
                >
                <option value="">Select Option</option>

                <option value="0">1</option>
                <option value="1">2</option>
                <option value="2">3</option>
                <option value="3">4</option>
                <option value="4">5</option>
                <option value="5">6</option>
                <option value="6">7</option>
                <option value="7">8</option>
                <option value="8">9</option>
                <option value="9">10</option>
                <option value="10">11</option>
                <option value="11">12</option>
                <option value="12">13</option>
                <option value="13">14</option>
                <option value="14">15</option>
                <option value="15">16</option>
                <option value="16">17</option>
                <option value="17">18</option>
                <option value="18">19</option>
                <option value="19">20</option>
                </select>
                
    
            
              
            </div>
        ) : null}

        <div className="form-group">
            <label htmlFor="excel-file">Upload Excel File:</label>
            <input 
            type="file" 
            disabled={!firstOption || (firstOption && secondOptionMap[firstOption][0] === false) || (firstOption && secondOptionMap[firstOption][0] === true && !secondOption)}
            className="excel-file" 
            accept=".xlsx, .xls, .csv" 
            onChange={handleFileUpload}
            
            />
        </div>

        

        <button className={excelFile? "cleanup-btn" : "cleanup-btn-disabled"} disabled={!excelFile}>Clean File</button>
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