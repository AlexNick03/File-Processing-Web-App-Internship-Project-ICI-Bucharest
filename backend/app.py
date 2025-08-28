from fastapi import FastAPI, UploadFile, File, Form, HTTPException, BackgroundTasks
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
import zipfile, tempfile
import json
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://13.60.8.194"],  # URL-ul frontend-ului
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # directorul fișierului curent
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
OUTPUT_FOLDER = os.path.join(BASE_DIR, "outputs")


os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)


#PDF -> Word
@app.post("/pdf-to-word/")
async def pdf_to_word(file: UploadFile = File(...),
                      background_tasks: BackgroundTasks = None):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, file.filename.rsplit(".", 1)[0] + ".docx")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    cv = Converter(input_path)
    cv.convert(output_path, start=0, end=None)
    cv.close()

    if background_tasks:
        background_tasks.add_task(os.remove, input_path)
        background_tasks.add_task(os.remove, output_path)
    return FileResponse(output_path, filename=os.path.basename(output_path))


#Word -> PDF
@app.post("/word-to-pdf/")
async def word_to_pdf(file: UploadFile = File(...),
                      background_tasks: BackgroundTasks = None):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, file.filename.rsplit(".", 1)[0] + ".pdf")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    convert(input_path, output_path)
    
    if background_tasks:
        background_tasks.add_task(os.remove, input_path)
        background_tasks.add_task(os.remove, output_path)

    return FileResponse(output_path, filename=os.path.basename(output_path))


#Image -> PDF
@app.post("/image-to-pdf/")
async def image_to_pdf(file: UploadFile = File(...),
                      background_tasks: BackgroundTasks = None):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, file.filename.rsplit(".", 1)[0] + ".pdf")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    image = Image.open(input_path).convert("RGB")
    image.save(output_path, "PDF")
    if background_tasks:
        background_tasks.add_task(os.remove, input_path)
        background_tasks.add_task(os.remove, output_path)
    return FileResponse(output_path, filename=os.path.basename(output_path))


#Image -> Word
@app.post("/image-to-word/")
async def image_to_word(file: UploadFile = File(...),
                      background_tasks: BackgroundTasks = None):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, file.filename.rsplit(".", 1)[0] + ".docx")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    doc = Document()
    doc.add_picture(input_path, width=Inches(6))  # păstrează aspectul
    doc.save(output_path)
    if background_tasks:
        background_tasks.add_task(os.remove, input_path)
        background_tasks.add_task(os.remove, output_path)
    return FileResponse(output_path, filename=os.path.basename(output_path))


#Image Convert (JPG/JPEG <-> PNG)
@app.post("/image-convert/")
async def image_convert(file: UploadFile = File(...), target_format: str = "png",
                        background_tasks: BackgroundTasks = None):
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
    if background_tasks:
        background_tasks.add_task(os.remove, input_path)
        background_tasks.add_task(os.remove, output_path)
    return FileResponse(output_path, filename=output_filename)


# Excel
#Return names of collumn
@app.post("/get-excel-collumn-name/")
async def get_excel_collumn_name(file: UploadFile = File(...)):
    # Salvăm fișierul temporar
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(input_path, "wb") as f:
        f.write(await file.read())

    # Alegem cum citim în funcție de extensie
    if file.filename.endswith(".csv"):
        df = pd.read_csv(input_path)
    else:  # presupunem Excel
        df = pd.read_excel(input_path)

    # Extragem numele coloanelor
    columns = [{"index": i, "name": col} for i, col in enumerate(df.columns)]
     
    return columns

#Excel -> CSV
@app.post("/excel-to-csv/")
async def excel_to_csv(file: UploadFile = File(...),
                      background_tasks: BackgroundTasks = None):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, file.filename.rsplit(".", 1)[0] + ".csv")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    df = pd.read_excel(input_path)
    df.to_csv(output_path, index=False)
    if background_tasks:
        background_tasks.add_task(os.remove, input_path)
        background_tasks.add_task(os.remove, output_path)
    return FileResponse(output_path, filename=os.path.basename(output_path))

#CSV -> Excel
@app.post("/csv-to-excel/")
async def csv_to_excel(file: UploadFile = File(...),
                      background_tasks: BackgroundTasks = None):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, file.filename.rsplit(".", 1)[0] + ".xlsx")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    df = pd.read_csv(input_path)
    df.to_excel(output_path, index=False)
    if background_tasks:
        background_tasks.add_task(os.remove, input_path)
        background_tasks.add_task(os.remove, output_path)
    return FileResponse(output_path, filename=os.path.basename(output_path))

#Excel Cleanup

@app.post("/clean-excel/")
async def clean_excel(file: UploadFile = File(...),
                      background_tasks: BackgroundTasks = None):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    ext = os.path.splitext(file.filename)[1].lower()
    cleaned_path = os.path.join(OUTPUT_FOLDER, f"cleaned{ext}")
    report_path = os.path.join(OUTPUT_FOLDER, "report.json")
    zip_path = os.path.join(OUTPUT_FOLDER, f"cleaned_package.zip")

    # Salvăm fișierul primit
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Citim fișierul în funcție de extensie
    if ext == ".csv":
        df = pd.read_csv(input_path)
    elif ext in [".xls", ".xlsx"]:
        df = pd.read_excel(input_path)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    # Raport inițial
    initial_shape = df.shape

    # Curățare avansată
    df = df.dropna(how="all")            # elimină rânduri complet goale
    df = df.dropna(axis=1, how="all")    # elimină coloane complet goale
    df = df.drop_duplicates()

    # Curățare whitespace
    df = df.applymap(lambda x: x.strip() if isinstance(x, str) else x)

    # Standardizare nume coloane
    df.columns = [col.strip().lower().replace(" ", "_") for col in df.columns]

    # Conversii de tipuri
    conversions = {}
    for col in df.columns:
        before_dtype = str(df[col].dtype)
        try:
            df[col] = pd.to_numeric(df[col])
        except Exception:
            try:
                df[col] = pd.to_datetime(df[col])
            except Exception:
                pass
        after_dtype = str(df[col].dtype)
        if before_dtype != after_dtype:
            conversions[col] = {"before": before_dtype, "after": after_dtype}

    #Raport final
    final_shape = df.shape
    report = {
        "initial_rows": initial_shape[0],
        "initial_columns": initial_shape[1],
        "final_rows": final_shape[0],
        "final_columns": final_shape[1],
        "rows_removed": initial_shape[0] - final_shape[0],
        "columns_removed": initial_shape[1] - final_shape[1],
        "dtype_conversions": conversions,
    }

    # Salvăm raportul JSON
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=4, ensure_ascii=False)

    # Salvăm fișierul curățat
    if ext == ".csv":
        df.to_csv(cleaned_path, index=False)
    else:
        df.to_excel(cleaned_path, index=False)

    # Punem ambele într-un ZIP
    with zipfile.ZipFile(zip_path, "w") as zipf:
        zipf.write(cleaned_path, os.path.basename(cleaned_path))
        zipf.write(report_path, os.path.basename(report_path))
    if background_tasks:
        background_tasks.add_task(os.remove, input_path)
        background_tasks.add_task(os.remove, cleaned_path)
        background_tasks.add_task(os.remove, report_path)
        background_tasks.add_task(os.remove, zip_path)
    return FileResponse(zip_path,  media_type="application/zip", filename="cleaned_package.zip")

#Data sort
@app.post("/sort-excel/")
async def sort_excel(
    file: UploadFile = File(...),
    column_index: int = Form(...),
    mode: str = Form("sort_asc"),  # implicit crescător
    background_tasks: BackgroundTasks = None
):
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_ext = os.path.splitext(file.filename)[1].lower()  # extragem extensia originală
    output_path = os.path.join(OUTPUT_FOLDER, f"sorted{output_ext}")

    # Salvăm fișierul încărcat
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Citim fișierul în funcție de extensie
    if output_ext == ".csv":
        df = pd.read_csv(input_path)
    elif output_ext in [".xls", ".xlsx"]:
        df = pd.read_excel(input_path)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    # Validăm indexul coloanei
    try:
        column_name = df.columns[column_index]
    except IndexError:
        raise HTTPException(status_code=400, detail="Invalid column index")

    # Alegem metoda de sortare
    if mode == "sort_asc":
        df = df.sort_values(by=column_name, ascending=True)
    elif mode == "sort_desc":
        df = df.sort_values(by=column_name, ascending=False)
    elif mode == "sort_alpha":
        df[column_name] = df[column_name].astype(str)
        df = df.sort_values(by=column_name, key=lambda x: x.str.lower())
    else:
        raise HTTPException(status_code=400, detail="Invalid sort mode")

    # Salvăm în același format ca inputul
    if output_ext == ".csv":
        df.to_csv(output_path, index=False)
    else:
        df.to_excel(output_path, index=False)
    if background_tasks:
        background_tasks.add_task(os.remove, input_path)
        background_tasks.add_task(os.remove, output_path)
    return FileResponse(output_path, filename=f"sorted{output_ext}")
