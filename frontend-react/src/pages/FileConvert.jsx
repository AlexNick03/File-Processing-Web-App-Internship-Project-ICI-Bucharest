import React, { useState, useEffect } from "react";
import "./file-convertor.css";

function FileConvertor() {
  const [fromFormat, setFromFormat] = useState("");
  const [toFormat, setToFormat] = useState("");
  const [file, setFile] = useState(null);
  const [animate, setAnimate] = useState(false);

  // Funcții pentru schimbări
  const handleFromChange = (e) => {
    setFromFormat(e.target.value);
    setToFormat("");
    setFile(null);
  };

  const handleToChange = (e) => {
    setToFormat(e.target.value);
    setFile(null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

const [loading, setLoading] = useState(false);
 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!file) return alert("Please select a file.");

  let endpoint = "";

  // Determinăm endpoint-ul în funcție de conversie
  if (fromFormat === "pdf" && toFormat === "docx") endpoint = "/pdf-to-word/";
  else if (fromFormat === "docx" && toFormat === "pdf") endpoint = "/word-to-pdf/";
  else if ((fromFormat === "jpg" || fromFormat === "png") && toFormat === "pdf") endpoint = "/image-to-pdf/";
  else if ((fromFormat === "jpg" || fromFormat === "png") && toFormat === "docx") endpoint = "/image-to-word/";
  else if ((fromFormat === "jpg" || fromFormat === "jpeg" || fromFormat === "png") && (toFormat === "jpg" || toFormat === "png")) endpoint = `/image-convert/?target_format=${toFormat}`;
  else return alert("Conversion not supported.");

  setLoading(true); // 🔹 începe animația de loading
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`http://localhost:8000` + endpoint, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Conversion failed");

    // Obține fișierul convertit și descarcă-l
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    // Numele fișierului convertit
    const extension = toFormat === "jpeg" ? "jpg" : toFormat;
    a.download = file.name.split(".")[0] + "." + extension;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.error(error);
    alert("An error occurred while converting the file.");
  }finally {
    setLoading(false); // 🔹 oprește animația
    setFile(null);
    setFromFormat("");
    setToFormat("");
  }
};

  // 🔹 Alegem mesajul + imaginea în funcție de progres
  let message = "Please select the type of the file that you want to convert";
  let image = "/images/chose.png";

  if (fromFormat && !toFormat) {
    message = "Please select the type of the file that you want to convert into";
    image = "/images/chose.png";
  } else if (fromFormat && toFormat && !file) {
    message = "Please select the file";
    image = "/images/pickup.png";
  } else if (file) {
    message = `Ready to convert ${file.name}`;
    image = "/images/ready.png";
  }

  // 🔹 Declanșăm animația când se schimbă mesajul sau imaginea
useEffect(() => {
  setAnimate(false); // resetează animația
  const timer = setTimeout(() => setAnimate(true), 100); // pornește animația
  return () => clearTimeout(timer);
}, [message, image]); // se declanșează de fiecare dată când se schimbă mesajul sau imaginea

  // Restricționăm tipurile de conversie acceptate
  const toOptionsMap = {
  pdf: ["docx"],             // PDF → Word
  docx: ["pdf"],             // Word → PDF
  jpg: ["pdf", "docx",  "png"],  // Image → toate
  png: ["pdf", "docx", "jpg"],  // Image → toate
};
const toOptions = fromFormat ? toOptionsMap[fromFormat] : [];

  // 🔹 Restricționăm extensiile acceptate
  let acceptedTypes = "";
  if (fromFormat === "pdf") acceptedTypes = ".pdf";
  if (fromFormat === "docx") acceptedTypes = ".doc,.docx";
  if (fromFormat === "jpg") acceptedTypes = ".jpg,.jpeg";
  if (fromFormat === "png") acceptedTypes = ".png";

  return (
    <div className="main-converter">
      <div className="file-converter">
        <h2>File Converter</h2>

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

        {/* Form */}
        <form id="convert-form" onSubmit={handleSubmit}>
          {/* From */}
          <div className="form-group">
            <label htmlFor="from-format">From:</label>
            <select
              id="from-format"
              name="from"
              required
              value={fromFormat}
              onChange={handleFromChange}
            >
              <option value="">Select format</option>
              <option value="pdf">PDF</option>
              <option value="docx">Word (DOC, DOCX)</option>
              <option value="jpg">Image (JPG, JPEG)</option>
              <option value="png">Image (PNG)</option>
            </select>
          </div>

          {/* To */}
          <div className="form-group">
                    <label htmlFor="to-format">To:</label>
                    <select
                        id="to-format"
                        name="to"
                        required
                        disabled={!fromFormat}
                        value={toFormat}
                        onChange={handleToChange}
                    >
                        <option value="">Select format</option>
                        {toOptions.map((format) => {
                        let label = format.toUpperCase();
                        if (format === "docx") label = "Word (DOCX)";
                        if (format === "jpg") label = "Image (JPG, JPEG)";
                        if (format === "png") label = "Image (PNG)";
                        return (
                            <option key={format} value={format}>
                            {label}
                            </option>
                        );
                        })}
                    </select>
                    </div>

          {/* File */}
          <div className="form-group">
            <label htmlFor="file-input">Choose File:</label>
            <input
              type="file"
              id="file-input"
              name="file"
              required
              disabled={!toFormat}
              onChange={handleFileChange}
              accept={acceptedTypes}
            />
          </div>

          <button type="submit" className={ file ? "submit-btn" : "submit-btn-disabled"} disabled={!file}>
            Convert
          </button>
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

export default FileConvertor;
