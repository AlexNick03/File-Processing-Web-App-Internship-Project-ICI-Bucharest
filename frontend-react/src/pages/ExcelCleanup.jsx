import React from "react";
import "./excel.css";

function Excel() {
  return (
    <div className="excel-cleanup">
      <h2>Excel Cleanup</h2>

      <div className="form-group">
        <label htmlFor="excel-file">Upload Excel File:</label>
        <input type="file" id="excel-file" accept=".xlsx, .xls, .csv" />
      </div>

      <div className="form-group">
        <label htmlFor="cleanup-option">Cleanup Options:</label>
        <select id="cleanup-option">
          <option value="remove-empty-rows">Remove Empty Rows</option>
          <option value="remove-duplicates">Remove Duplicates</option>
          <option value="trim-spaces">Trim Extra Spaces</option>
        </select>
      </div>

      <button className="cleanup-btn">Clean File</button>
    </div>
  );
}

export default Excel;