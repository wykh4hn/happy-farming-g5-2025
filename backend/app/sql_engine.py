import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

# Always load .env from the same directory as this file
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

DB_HOSTNAME = os.getenv("DB_HOSTNAME", "localhost")
DB_USERNAME = os.getenv("DB_USERNAME", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_NAME = os.getenv("DB_NAME", "mysql")
DB_PORT = os.getenv("DB_PORT", "3306")

print(f"Connecting to database: {DB_NAME} at {DB_HOSTNAME}:{DB_PORT} with user {DB_USERNAME}")

# Handle empty password properly
if DB_PASSWORD:
    connection_string = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOSTNAME}:{DB_PORT}/{DB_NAME}"
else:
    connection_string = f"mysql+pymysql://{DB_USERNAME}@{DB_HOSTNAME}:{DB_PORT}/{DB_NAME}"

engine = create_engine(connection_string)

print(f"Loaded from .env: {DB_USERNAME=}, {DB_PASSWORD=}, {DB_HOSTNAME=}, {DB_NAME=}")