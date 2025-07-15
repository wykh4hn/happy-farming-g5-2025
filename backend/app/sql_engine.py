import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

# Tìm đúng đường dẫn file .env và load lên
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
print(f"Đường dẫn .env đang dùng: {dotenv_path}")
print(f"File .env tồn tại? {os.path.exists(dotenv_path)}")

load_dotenv(dotenv_path)

DB_HOSTNAME = os.getenv("DB_HOSTNAME", "localhost")
DB_USERNAME = os.getenv("DB_USERNAME", "khanh")
DB_PASSWORD = os.getenv("DB_PASSWORD", "nq.khanh11")
DB_NAME = os.getenv("DB_NAME", "mysql")

print(f"[DEBUG] DB_USERNAME={DB_USERNAME}, DB_PASSWORD={DB_PASSWORD}, DB_HOSTNAME={DB_HOSTNAME}, DB_NAME={DB_NAME}")

engine = create_engine(
    f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOSTNAME}/{DB_NAME}"
)
