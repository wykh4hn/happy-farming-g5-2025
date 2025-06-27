from turtle import st
from django.db import connection
from django.http import JsonResponse
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from regex import R

app = FastAPI()

origins = ["*"]

# mysql configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "the_dtb_name"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/jsonData")
async def funcTest():
    jsonResult = {
        "name": "Son",
        "Uni-year": "2"}

    return jsonResult

@app.get("/students/")
def get_students():
        try:
            connection = mysql.connector.connect(**db_config)
            cursor = connection.cursor()
            query = "SELECT * FROM students"
            cursor.execute(query)
            result = cursor.fetchall()
            students = [dict(zip(cursor.column_names, row))]
            cursor.close()
            connection.close()

            return students
        except mysql.connector.Error as err:
            return {"error": f"Error: {err}"}

