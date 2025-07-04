import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

load_dotenv()
HOSTNAME = os.getenv("HOSTNAME")
USERNAME = os.getenv("USERNAME")
PASSWORD = os.getenv("PASSWORD")
DATABASE = os.getenv("DATABASE")

engine = create_engine(
    f"mysql+pymysql://{USERNAME}:{PASSWORD}@{HOSTNAME}/{DATABASE}"
)

