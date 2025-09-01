# File-Processing-Web-App-Internship-Project-ICI-Bucharest EC2 : http://56.228.2.150/
## Overview

File Handler is a web application that allows users to perform **file conversion and manipulation** operations on various file types, including **PDF, Word, Excel, and images**. The application combines a **modern React frontend** with a **Python FastAPI backend**, providing an interactive and user-friendly experience.

---

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

## Project Structure
Backend

Framework: FastAPI

Why FastAPI: FastAPI enables rapid creation of modern API endpoints and integrates smoothly with Python code for file processing.

Libraries used:

pandas – for processing Excel and CSV files.

pdf2docx, docx2pdf – for PDF ↔ Word conversion.

Pillow (PIL) – for image manipulation and conversion.

Functionality:

Upload and convert multiple file types (PDF ↔ Word, Image ↔ PDF, Excel ↔ CSV).

Excel file cleanup and sorting.

Endpoints optimized for React frontend requests.

Hosting

Platform: AWS EC2

Why AWS: EC2 provides flexibility, is widely used, and allows running the application in a stable cloud environment.

Plan: Free-tier AWS

Setup:

FastAPI runs on the EC2 instance, exposed via port 8000.

React build served using Nginx.

CORS configured to allow frontend-backend communication.
