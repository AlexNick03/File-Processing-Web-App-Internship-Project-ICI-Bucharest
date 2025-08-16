from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
import shutil
import os
from pdf2docx import Converter
from docx2pdf import convert
import pandas as pd
from PIL import Image
from docx import Document
from docx.shared import Inches
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL-ul frontend-ului
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "outputs"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)


# ---------------- PDF -> Word ----------------
@app.post("/pdf-to-word/")
async def pdf_to_word(file: UploadFile = File(...)):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, file.filename.rsplit(".", 1)[0] + ".docx")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    cv = Converter(input_path)
    cv.convert(output_path, start=0, end=None)
    cv.close()

    return FileResponse(output_path, filename=os.path.basename(output_path))


# ---------------- Word -> PDF ----------------
@app.post("/word-to-pdf/")
async def word_to_pdf(file: UploadFile = File(...)):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, file.filename.rsplit(".", 1)[0] + ".pdf")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    convert(input_path, output_path)

    return FileResponse(output_path, filename=os.path.basename(output_path))


# ---------------- Image -> PDF ----------------
@app.post("/image-to-pdf/")
async def image_to_pdf(file: UploadFile = File(...)):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, file.filename.rsplit(".", 1)[0] + ".pdf")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    image = Image.open(input_path).convert("RGB")
    image.save(output_path, "PDF")

    return FileResponse(output_path, filename=os.path.basename(output_path))


# ---------------- Image -> Word ----------------
@app.post("/image-to-word/")
async def image_to_word(file: UploadFile = File(...)):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, file.filename.rsplit(".", 1)[0] + ".docx")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    doc = Document()
    doc.add_picture(input_path, width=Inches(6))  # păstrează aspectul
    doc.save(output_path)

    return FileResponse(output_path, filename=os.path.basename(output_path))


# ---------------- Image Convert (JPG/JPEG <-> PNG) ----------------
@app.post("/image-convert/")
async def image_convert(file: UploadFile = File(...), target_format: str = "png"):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)

    # Normalizează target_format
    target_format = target_format.lower()
    if target_format in ["jpg", "jpeg"]:
        target_format = "png"  # forțăm PNG pentru transparență

    output_filename = file.filename.rsplit(".", 1)[0] + f".{target_format}"
    output_path = os.path.join(OUTPUT_FOLDER, output_filename)

    # Salvează fișierul uploadat
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Deschide imaginea și convertește
    image = Image.open(input_path).convert("RGBA")  # RGBA pentru transparență

    # Elimină fundalul alb (transformă alb în transparent)
    datas = image.getdata()
    newData = []
    for item in datas:
        # item = (R, G, B, A)
        if item[0] > 240 and item[1] > 240 and item[2] > 240:  # detectează alb
            newData.append((255, 255, 255, 0))  # transparent
        else:
            newData.append(item)
    image.putdata(newData)

    # Salvează imaginea PNG
    image.save(output_path, "PNG")

    return FileResponse(output_path, filename=output_filename)


# ---------------- Clean Excel ----------------
@app.post("/clean-excel/")
async def clean_excel(file: UploadFile = File(...)):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, file.filename)

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    df = pd.read_excel(input_path)
    df_clean = df.dropna(how='all').drop_duplicates()
    df_clean.to_excel(output_path, index=False)

    return FileResponse(output_path, filename=os.path.basename(output_path))
