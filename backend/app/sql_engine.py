import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

# Always load .env from the same directory as this file
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
# load_dotenv(dotenv_path)

DB_HOSTNAME = os.getenv("DB_HOSTNAME", "localhost")
DB_USERNAME = os.getenv("DB_USERNAME", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_NAME = os.getenv("DB_NAME", "mysql")

print(f"Connecting to database: {DB_NAME} at {DB_HOSTNAME} with user {DB_USERNAME}")

engine = create_engine(
    f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOSTNAME}/{DB_NAME}"
)

print(f"Loaded from .env: {DB_USERNAME=}, {DB_PASSWORD=}, {DB_HOSTNAME=}, {DB_NAME=}")

#change match w my local env tho