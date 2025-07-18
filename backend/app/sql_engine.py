import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")


load_dotenv(dotenv_path)

DB_HOSTNAME = os.getenv("DB_HOSTNAME", "localhost")
DB_USERNAME = os.getenv("DB_USERNAME", "sownbeos")
DB_PASSWORD = os.getenv("DB_PASSWORD", "07032005")
DB_NAME = os.getenv("DB_NAME", "mysql")


print(f"[DEBUG] DB_USERNAME={DB_USERNAME}, DB_PASSWORD={DB_PASSWORD}, DB_HOSTNAME={DB_HOSTNAME}, DB_NAME={DB_NAME}")

try:
    engine = create_engine(
        f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOSTNAME}/{DB_NAME}"
    )
    # Test the connection
    with engine.connect() as conn:
        print("[DEBUG] Database connection successful")
except Exception as e:
    print(f"[ERROR] Database connection failed: {e}")
    # Continue without database for now
    engine = None