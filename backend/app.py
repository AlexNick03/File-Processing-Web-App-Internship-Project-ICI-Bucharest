from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
import shutil
import os
from typing import List
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


#PDF -> Word
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


#Word -> PDF
@app.post("/word-to-pdf/")
async def word_to_pdf(file: UploadFile = File(...)):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, file.filename.rsplit(".", 1)[0] + ".pdf")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    convert(input_path, output_path)

    return FileResponse(output_path, filename=os.path.basename(output_path))


#Image -> PDF
@app.post("/image-to-pdf/")
async def image_to_pdf(file: UploadFile = File(...)):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, file.filename.rsplit(".", 1)[0] + ".pdf")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    image = Image.open(input_path).convert("RGB")
    image.save(output_path, "PDF")

    return FileResponse(output_path, filename=os.path.basename(output_path))


#Image -> Word
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


#Image Convert (JPG/JPEG <-> PNG)
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


# Excel
#Excel -> CSV
@app.post("/excel-to-csv/")
async def excel_to_csv(file: UploadFile = File(...)):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, file.filename.rsplit(".", 1)[0] + ".csv")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    df = pd.read_excel(input_path)
    df.to_csv(output_path, index=False)

    return FileResponse(output_path, filename=os.path.basename(output_path))

#CSV -> Excel
@app.post("/csv-to-excel/")
async def csv_to_excel(file: UploadFile = File(...)):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, file.filename.rsplit(".", 1)[0] + ".xlsx")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    df = pd.read_csv(input_path)
    df.to_excel(output_path, index=False)

    return FileResponse(output_path, filename=os.path.basename(output_path))

#Merge Excel
@app.post("/merge-excel/")
async def merge_excel(files: List[UploadFile] = File(...)):
    dfs = []
    for file in files:
        input_path = os.path.join(UPLOAD_FOLDER, file.filename)
        with open(input_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        dfs.append(pd.read_excel(input_path))

    merged = pd.concat(dfs, ignore_index=True)
    output_path = os.path.join(OUTPUT_FOLDER, "merged.xlsx")
    merged.to_excel(output_path, index=False)

    return FileResponse(output_path, filename="merged.xlsx")

#Split Excel
@app.post("/split-excel/")
async def split_excel(file: UploadFile = File(...)):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    xls = pd.ExcelFile(input_path)
    output_files = []

    for sheet_name in xls.sheet_names:
        df = pd.read_excel(xls, sheet_name=sheet_name)
        output_path = os.path.join(OUTPUT_FOLDER, f"{sheet_name}.xlsx")
        df.to_excel(output_path, index=False)
        output_files.append(output_path)

    return [FileResponse(f, filename=os.path.basename(f)) for f in output_files]
#Excel Cleanup
@app.post("/clean-excel/")
async def clean_excel(file: UploadFile = File(...)):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, "cleaned.xlsx")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    df = pd.read_excel(input_path)
    df = df.dropna().drop_duplicates()
    df.to_excel(output_path, index=False)

    return FileResponse(output_path, filename="cleaned.xlsx")

#Data sort
@app.post("/sort-excel/")
async def sort_excel(
    file: UploadFile = File(...),
    column: str = Form(...),
    mode: str = Form("asc")  # implicit crescător
):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, "sorted.xlsx")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    df = pd.read_excel(input_path)

    # Alegem metoda de sortare în funcție de `mode`
    if mode == "asc":
        df = df.sort_values(by=column, ascending=True)
    elif mode == "desc":
        df = df.sort_values(by=column, ascending=False)
    elif mode == "alpha":
        df[column] = df[column].astype(str)  # asigurăm text
        df = df.sort_values(by=column, key=lambda x: x.str.lower())
    else:
        raise HTTPException(status_code=400, detail="Invalid sort mode")

    df.to_excel(output_path, index=False)

    return FileResponse(output_path, filename="sorted.xlsx")