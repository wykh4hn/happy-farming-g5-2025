from turtle import st

from fastapi import FastAPI, APIRouter
from fastapi.staticfiles import StaticFiles

from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from regex import R

# load env
import os
from dotenv import load_dotenv


from .models import ProductModel, Product

# import sqlalchemy
from sqlalchemy.orm import declarative_base
from pydantic import BaseModel, ConfigDict, Field

from typing import Dict, Literal, Any, List

from sqlmodel import Field, Session, SQLModel, create_engine



app = FastAPI()
api_router = APIRouter(prefix="/api")

# load env
load_dotenv()
HOSTNAME = os.getenv("HOSTNAME")
USERNAME = os.getenv("USERNAME")
PASSWORD = os.getenv("PASSWORD")
DATABASE = os.getenv("DATABASE")

engine = create_engine(
    f"mysql+pymysql://{USERNAME}:{PASSWORD}@{HOSTNAME}/{DATABASE}"
)

# api goes here

async def create_product(product: ProductModel) -> None:
    """_summary_

    Args:
        product (ProductModel): Create product and push to database
    """
    
    # IS THIS IT LMAO
    with Session(engine) as session:
        session.add(product)
        session.commit()
        
async def read_products(attribute: Dict[str, str]) -> Any:
    """_summary_

    Args:
        attribute (Dict[str, str]): Filter attributes for product

    Returns:
        List[ProductModel]: _description_
    """
    with Session(engine) as session:
        pass
    pass
    
    
    
async def remove_product(attribute: Dict[str, str], value: Any) -> None:
    """_summary_

    Args:
        product (ProductModel): Remove all products with attribute 
        Removal by id
    """
    with Session(engine) as session:
        pass
    pass

async def update_product(attributes: Dict[str, str], new_values: Dict[str, str]) -> None:
    """

    Args:
        attributes (Dict[str, str]): Select set of attributes to identify value(s)
        new_values (Dict[str, str]): New values to update accordingly.
        
        Update product to use 
    """
    with Session(engine) as session:
        pass
    pass


if __name__ == "__main__":
    SQLModel.metadata.create_all(engine)
    engine = create_engine("sqlite:///database.db")
    SQLModel.metadata.create_all(engine)
    app.add_middleware(
    CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(api_router)
    app.mount("/", app=StaticFiles(directory="../../frontend/build", html=True), name="app")