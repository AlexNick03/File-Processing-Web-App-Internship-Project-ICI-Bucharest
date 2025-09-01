# File-Processing-Web-App-Internship-Project-ICI-Bucharest EC2 : http://56.228.2.150/
File Handler Web App
Overview

File Handler is a web application that allows users to perform file conversion and manipulation operations on various file types, including PDF, Word, Excel, and images. The application combines a modern React frontend with a Python FastAPI backend, providing an interactive and user-friendly experience.

Frontend

Framework: React

Why React: React simplifies routing, component management, and state handling, making the frontend fast, scalable, and modern.

Design:

Warm and pleasant visual style, minimalist layout.

Responsive CSS to ensure compatibility on desktop and mobile devices.

Functionality:

Intuitive interface for file uploads and conversion selection.

Status messages and previews where applicable.

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
