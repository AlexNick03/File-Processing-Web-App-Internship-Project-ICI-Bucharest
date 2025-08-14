from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
import shutil
import os
from pdf2docx import Converter
from docx2pdf import convert
import pandas as pd
from pdf2image import convert_from_path
from PIL import Image
app = FastAPI()

UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "outputs"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)



@app.post("/pdf-to-word/")
async def pdf_to_word(file: UploadFile = File(...)):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, file.filename.rsplit(".", 1)[0] + ".docx")

    # Salvează fișierul uploadat
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Convert PDF -> Word
    cv = Converter(input_path)
    cv.convert(output_path, start=0, end=None)
    cv.close()

    return FileResponse(output_path, filename=os.path.basename(output_path))


@app.post("/word-to-pdf/")
async def word_to_pdf(file: UploadFile = File(...)):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, file.filename.rsplit(".", 1)[0] + ".pdf")

    # Salvează fișierul uploadat
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Convert Word -> PDF
    convert(input_path, output_path)

    return FileResponse(output_path, filename=os.path.basename(output_path))

# PDF -> Image (PNG/JPG)
@app.post("/pdf-to-image/")
async def pdf_to_image(file: UploadFile = File(...), image_format: str = "png"):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    base_name = file.filename.rsplit(".", 1)[0]
    output_files = []
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    pages = convert_from_path(input_path)
    for i, page in enumerate(pages):
        output_path = os.path.join(OUTPUT_FOLDER, f"{base_name}_page{i+1}.{image_format}")
        page.save(output_path, image_format.upper())
        output_files.append(output_path)
    return {"files": [os.path.basename(f) for f in output_files]}

# Image (PNG/JPG) -> PDF
@app.post("/image-to-pdf/")
async def image_to_pdf(file: UploadFile = File(...)):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, file.filename.rsplit(".", 1)[0] + ".pdf")
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    image = Image.open(input_path).convert("RGB")
    image.save(output_path, "PDF")
    return FileResponse(output_path, filename=os.path.basename(output_path))

# DOCX -> Image (PNG/JPG) via PDF
@app.post("/word-to-image/")
async def word_to_image(file: UploadFile = File(...), image_format: str = "png"):
    # DOCX -> PDF temporar
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    temp_pdf = os.path.join(OUTPUT_FOLDER, file.filename.rsplit(".", 1)[0] + ".pdf")
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    convert(input_path, temp_pdf)
    # PDF -> imagini
    pages = convert_from_path(temp_pdf)
    output_files = []
    for i, page in enumerate(pages):
        output_path = os.path.join(OUTPUT_FOLDER, f"{file.filename}_page{i+1}.{image_format}")
        page.save(output_path, image_format.upper())
        output_files.append(output_path)
    return {"files": [os.path.basename(f) for f in output_files]}

# PNG <-> JPG
@app.post("/image-convert/")
async def image_convert(file: UploadFile = File(...), target_format: str = "png"):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, file.filename.rsplit(".", 1)[0] + f".{target_format}")
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    image = Image.open(input_path)
    if target_format.lower() == "jpg":
        image = image.convert("RGB")
    image.save(output_path, target_format.upper())
    return FileResponse(output_path, filename=os.path.basename(output_path))

@app.post("/clean-excel/")
async def clean_excel(file: UploadFile = File(...)):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, file.filename)

    # Salvează fișierul uploadat
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Curățare Excel cu pandas
    df = pd.read_excel(input_path)

    # Exemplu simplu: elimină rândurile goale și duplicate
    df_clean = df.dropna(how='all').drop_duplicates()

    df_clean.to_excel(output_path, index=False)

    return FileResponse(output_path, filename=os.path.basename(output_path))