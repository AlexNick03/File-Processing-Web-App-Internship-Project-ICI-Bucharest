# File-Processing-Web-App-Internship-Project-ICI-Bucharest EC2 : http://56.228.2.150/
## Overview

> **Internship Project at ICI Bucharest**  
> This project was developed as part of my internship and practice program. The File Handler Web App allows users to perform **file conversion and manipulation** operations on various file types, including **PDF, Word, Excel, and images**. The application combines a **modern React frontend** with a **Python FastAPI backend**, providing an interactive and user-friendly experience.

---
## Project data flow diagram

<img width="1920" height="1080" alt="FileHandler" src="https://github.com/user-attachments/assets/2414f567-cb8f-492a-a52e-9ac100b5d410" />

## Frontend

- **Framework:** React  
- **Why React:**  
  - Simplifies routing, component management, and state handling.  
  - Provides a fast, modern, and scalable frontend.  
- **Design:**  
  - Warm and pleasant visual style.  
  - Minimalist layout with **responsive CSS** for desktop and mobile devices.  
- **Functionality:**  
  - Intuitive interface for file uploads and conversion selection.  
  - Handles requests to backend REST API endpoints.  

---

## Backend

- **Framework:** FastAPI  
- **Architecture:** REST API style  
  - Each operation has a dedicated endpoint (e.g., `/pdf-to-word`, `/word-to-pdf`, `/excel-to-csv`).  
  - Frontend communicates with backend through **HTTP POST requests**.  
- **Why FastAPI:**  
  - Rapid creation of modern API endpoints.  
  - Smooth integration with Python libraries for file processing.  
- **Libraries used:**  
  - `pandas` – for Excel and CSV processing.  
  - `pdf2docx` / `docx2pdf` – for PDF ↔ Word conversion.  
  - `Pillow (PIL)` – for image manipulation and conversion.  
- **Functionality:**  
  - Upload and convert multiple file types.  
  - Excel file cleanup and sorting.  
  - Returns processed files for frontend download.  

---

## Hosting

- **Platform:** AWS EC2  
- **Why AWS:** Widely used cloud platform with flexibility for deployment.  
- **Plan:** Free-tier AWS  
- **Setup:**  
  - FastAPI runs on the EC2 instance on port 8000.  
  - React build served via **Nginx**.  
  - **CORS** configured for frontend-backend communication.  

---


