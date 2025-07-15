import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

# Tìm đúng đường dẫn file .env và load lên
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
<<<<<<< HEAD
print(f"Đường dẫn .env đang dùng: {dotenv_path}")
print(f"File .env tồn tại? {os.path.exists(dotenv_path)}")

=======
>>>>>>> a6aad9c85fc33e2eb6815bdabf79e3817379288b
load_dotenv(dotenv_path)

DB_HOSTNAME = os.getenv("DB_HOSTNAME", "localhost")
DB_USERNAME = os.getenv("DB_USERNAME", "khanh")
DB_PASSWORD = os.getenv("DB_PASSWORD", "nq.khanh11")
DB_NAME = os.getenv("DB_NAME", "mysql")
DB_PORT = os.getenv("DB_PORT", "3306")

<<<<<<< HEAD
print(f"[DEBUG] DB_USERNAME={DB_USERNAME}, DB_PASSWORD={DB_PASSWORD}, DB_HOSTNAME={DB_HOSTNAME}, DB_NAME={DB_NAME}")

engine = create_engine(
    f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOSTNAME}/{DB_NAME}"
)
=======
print(f"Connecting to database: {DB_NAME} at {DB_HOSTNAME}:{DB_PORT} with user {DB_USERNAME}")

# Handle empty password properly
if DB_PASSWORD:
    connection_string = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOSTNAME}:{DB_PORT}/{DB_NAME}"
else:
    connection_string = f"mysql+pymysql://{DB_USERNAME}@{DB_HOSTNAME}:{DB_PORT}/{DB_NAME}"

engine = create_engine(connection_string)

print(f"Loaded from .env: {DB_USERNAME=}, {DB_PASSWORD=}, {DB_HOSTNAME=}, {DB_NAME=}")
>>>>>>> a6aad9c85fc33e2eb6815bdabf79e3817379288b
