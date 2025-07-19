import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

# MySQL Workbench default settings
DB_HOSTNAME = os.getenv("DB_HOSTNAME", "localhost")
DB_USERNAME = os.getenv("DB_USERNAME", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "a"    )  # Your MySQL password
DB_NAME = os.getenv("DB_NAME", "mysql")
DB_PORT = os.getenv("DB_PORT", "3306")

print(f"[DEBUG] Connecting to: {DB_USERNAME}@{DB_HOSTNAME}:{DB_PORT}/{DB_NAME}")

engine = None

try:
    engine = create_engine(
        f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOSTNAME}:{DB_PORT}/{DB_NAME}",
        echo=False,
        pool_timeout=20,
        pool_recycle=3600,
        connect_args={"connect_timeout": 10}
    )
    # Test connection
    with engine.connect() as conn:
        print("[DEBUG] Database connection successful")
except Exception as e:
    print(f"[ERROR] Database connection failed: {e}")
    print("[WARNING] Continuing without database...")
    engine = None