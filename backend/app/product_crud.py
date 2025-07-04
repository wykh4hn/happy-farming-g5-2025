import mysql.connector
from .models import ProductModel

# import sqlalchemy
from sqlalchemy.orm import declarative_base
from pydantic import BaseModel, ConfigDict, Field

from typing import Dict, Literal, Any, List

from sqlmodel import Field, SQLModel

conn = mysql.connector.connect(
    # now, this is a local file. Imagine if someone got access to it... 
    # I mean someone HAS to take one for the team, right?
    user = "s105541452", 
    password = "030805", 
    
    # remember this?
    host = "feenix-mariadb.swin.edu.au")

cursor = conn.cursor()

Base = declarative_base()




async def create_product(product: ProductModel) -> None:
    """_summary_

    Args:
        product (ProductModel): Create product and push to database
    """
    conn.connect()
    cursor = conn.cursor()
    
    
async def read_products(attribute: Dict[str, str]) -> Any:
    """_summary_

    Args:
        attribute (Dict[str, str]): Filter attributes for product

    Returns:
        List[ProductModel]: _description_
    """
    conn.connect()
    
    
    
async def remove_product(attribute: Dict[str, str], value: Any) -> None:
    """_summary_

    Args:
        product (ProductModel): Remove all products with attribute 
        Removal by id
    """
    conn.connect()
    
async def update_product(attributes: Dict[str, str], new_values: Dict[str, str]) -> None:
    """

    Args:
        attributes (Dict[str, str]): Select set of attributes to identify value(s)
        new_values (Dict[str, str]): New values to update accordingly.
        
        Update product to use 
    """
    conn.connect()
    

