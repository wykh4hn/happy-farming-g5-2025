from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime
import sqlalchemy as sa
from sqlalchemy.orm import declarative_base
from typing import List
from sqlmodel import Field, SQLModel

Base = declarative_base()

class ProductModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    metadata: dict[str, str] = Field(alias='metadata_')
    
    # data
    id: int
    
    name: str
    price: int
     
    # does currency matter if its' all ETH on that Ganace or whatever thing?
    description: str
    categories: str # space seperated
    quantity: int
    timestamp: datetime
    
    # we don't need bought, we only assert quantity == 0
    assetType: str
    contractAddress: str
    tokenId: str
    owner: str
    
    # buyable so tradable is always true?

    
class Product(SQLModel, table=True):
    """_summary_
    
    Model of the Product.

    Args:
        SQLModel (_type_): _description_
        table (bool, optional): _description_. Defaults to True.
    """
    id: int | None = Field(default=None, primary_key=True)
    
    name: str
    price: int
     
    # does currency matter if its' all ETH on that Ganace or whatever thing?
    description: str
    categories: str # space seperated
    quantity: int
    timestamp: datetime
    
    # we don't need bought, we only assert quantity == 0
    assetType: str
    contractAddress: str
    tokenId: str
    owner: str