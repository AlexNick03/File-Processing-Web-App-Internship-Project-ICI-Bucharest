import React from "react"
import "./file-convertor.css"

function FileConvertor() {
return (
    <div className = "word-to-pdf">
        <div className="file-converter">
            <h2>File Converter</h2>
            <div className = "animation-panel" >
                    <span ><h4 className = "convert-instruction">Please select the type of the file that you want to convert</h4></span>
                    
                    <img src ="/images/chose.png" className = "choice-image"/>
                    
                </div>
            <form id="convert-form">
                
                <div className="form-group">
                    <label htmlFor="from-format">From:</label>
                    <select id="from-format" name="from" required>
                        <option value="" disabled selected>Select format</option>
                        <option value="pdf">PDF</option>
                        <option value="docx">Word (DOCX)</option>
                        <option value="jpg">Image (JPG)</option>
                        <option value="png">Image (PNG)</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="to-format">To:</label>
                    <select id="to-format" name="to" required>
                        <option value="" disabled selected>Select format</option>
                        <option value="pdf">PDF</option>
                        <option value="docx">Word (DOCX)</option>
                        <option value="jpg">Image (JPG)</option>
                        <option value="png">Image (PNG)</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="file-input">Choose File:</label>
                    <input type="file" id="file-input" name="file" required disabled/>
                </div>

                <button type="submit" className="convert-btn">Convert</button>
            </form>
            
        </div>
    </div>
)
}
export default FileConvertor;