import React from "react";
import "./excel.css";
import { useState, useEffect} from "react";

function Excel() {
  const secondOptionMap = {
    default: [false, "null"],
    "csv_to_excel": [false, "null"],
    "excel_to_csv": [false, "null"],
    "sort_alpha": [true,"column_index"],
    "sort_asc": [true,"column_index"],
    "sort_desc": [true,"column_index"],
    "clean_excel" : [false, "null"],
  }
  const [collumnsName, setCollumnsName] = useState([]);
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
    
  }

 const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  setExcelFile(file);
  setSecondOption("");

  if (firstOption === "sort_alpha" || firstOption === "sort_asc" || firstOption === "sort_desc") {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`/api/get-excel-collumn-name/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to get column names");

      const columns = await response.json();
      setCollumnsName(columns);
     
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
};
  let message = "Please select the option you want to perform";
  let image = "/images/option.png";
  if (firstOption && !excelFile) {
      message = "Please select the file you want to perform the operation on";
      image = "/images/excel-pickup.png";
    } else if ((firstOption && excelFile && secondOptionMap[firstOption][0] && !secondOption)) {
       
        message = "Please select the column you want to perform the operation on";
        image = "/images/collumns.png"; 
          
    }
    else if ((firstOption && excelFile && !secondOptionMap[firstOption][0]) ||(firstOption && excelFile &&secondOptionMap[firstOption][0] && secondOption) ) {
      message = `Ready to perform ${firstOption} on ${excelFile ? excelFile.name : ""}`;
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
    if (!excelFile || !firstOption) return alert("Please select a file to perform an operation.");
    if (firstOption  === "csv_to_excel") endpoint = "/csv-to-excel/";
    else if (firstOption === "excel_to_csv") endpoint = "/excel-to-csv/";
    else if (firstOption === "sort_alpha" || firstOption === "sort_desc" || firstOption === "sort_asc") endpoint = "/sort-excel/";
    else if (firstOption === "clean_excel") endpoint = "/clean-excel/";
    else return alert("Conversion not supported.");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", excelFile);
    if (firstOption === "sort_alpha" || firstOption === "sort_desc" || firstOption === "sort_asc"){
       formData.append("column_index", secondOption);
       formData.append("mode", firstOption);
       
       
    
    }
    for (let [key, value] of formData.entries()) {
             console.log(`${key}:`, value);
    }
    try {
      const response = await fetch(`/api/` + endpoint, {
        method: "POST",
        body: formData,
      });
      console.log(response);
      
      if (!response.ok) throw new Error("Conversion failed");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      let extension = ""
      if (firstOption === "csv_to_excel") extension = ".xlsx";
      else if (firstOption === "excel_to_csv") extension = ".csv";
      else if (firstOption === "split_files") extension = ".zip";
      else if ((firstOption === "sort_alpha" || firstOption === "sort_desc" || firstOption === "sort_asc") && excelFile.name.split(".")[1]=== "csv") extension = ".csv";
      else if (firstOption === "clean_excel" ) extension = ".zip";
       
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
      setCollumnsName([]);
    }
  
  };
 
  let acceptedTypes = ".xlsx, .xls, .csv";

      if (firstOption === "csv_to_excel") {
        acceptedTypes = ".csv";
      } else if (firstOption === "excel_to_csv") {
        acceptedTypes = ".xlsx, .xls";
      }
  return (
    <div className="main-excel">
      <div className="excel-options">
      <h2>Excel Operations</h2>
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
            <option value="sort_alpha">Sort Data - Alphabetical (by column)</option>
            <option value="sort_asc">Sort Data - Ascending (by column)</option>
            <option value="sort_desc">Sort Data - Descending  (by column)</option>
            <option value="clean_excel">Excel Smart Clean</option>
          
          </select>
        </div>
         <div className="form-group">
            <label htmlFor="excel-file">Upload Excel File:</label>
            <input 
            key={firstOption}
            type="file" 
            disabled={!firstOption}
            className="excel-file" 
            accept={acceptedTypes}
            onChange={handleFileUpload }
            />
        </div>
          {firstOption && secondOptionMap[firstOption][0] === true ?  (
            <div className="form-group">
              <label htmlFor="second-option">Select index of the column to perform th Operaton:</label>

                <select
                
                value={secondOption}
                onChange={handleSecondOption}
                disabled={!excelFile}
                required
                id="second-option"
                >
                <option value="">Select Option</option>
                {collumnsName.map((obj) => (
                  <option key={obj["index"]} value={obj["index"]}>
                    {obj["name"]}
                  </option>
                ))}  
                </select>
            </div>
        ) : null}

       

        

        <button type= "sumbit" className={(firstOption === "sort_alpha" || firstOption === "sort_asc" || firstOption === "sort_desc") && secondOption || excelFile && (collumnsName.length === 0) ? "submit-btn" : "submit-btn-disabled"} disabled={!excelFile}>Perform Operation</button>
        
    </form>
        {loading && (
                  <div className="loading-overlay">
                      <div className="spinner"></div>
                  </div>
              )}
    </div>
    </div>
  );
}

export default Excel;