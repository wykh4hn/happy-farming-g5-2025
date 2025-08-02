from typing import Optional
from sqlmodel import SQLModel, Field
from pydantic import BaseModel
from datetime import datetime

from sqlalchemy import  Column, TEXT
from sqlalchemy.dialects.mysql import LONGTEXT
from typing import Optional

# Product Models


# class Product(SQLModel, table=True):
#     id: Optional[int] = Field(default=None, primary_key=True)
#     name: str
#     description: str
#     price: float  # Price in ETH
#     currency: str = "ETH"
#     quantity: int = 1
#     asset_type: str = "digital"
#     category: str = "Other"
#     owner: str
#     img: Optional[str] = Field(default=None, sa_column=Column(TEXT))
#     contractAddress: str
#     token_id: str
#     in_stock: bool = True


class ProductBase(BaseModel):
    name: str
    description: Optional[str] = ""
    price: float
    currency: str = "ETH"
    quantity: int = 1
    asset_type: str = "digital"
    category: str = "Other"
    owner: str
    img: Optional[str] = ""
    contractAddress: str = ""
    tokenId: str = ""
    in_stock: bool = True


class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(min_length=1, max_length=200)
    description: str = Field(min_length=1, max_length=1000)
    price: float = Field(gt=0)
    currency: str = Field(default="ETH", max_length=10)
    quantity: int = Field(default=1, ge=0)
    asset_type: str = Field(default="digital", max_length=50)
    category: str = Field(default="Other", max_length=50)
    owner: str = Field(min_length=42, max_length=42) 
    img: Optional[str] = Field(default=None, sa_column=Column(TEXT))
    contractAddress: str = Field(min_length=42, max_length=42)
    tokenId: str = Field(min_length=1, max_length=100)
    in_stock: bool = Field(default=True)
    



# Purchase Models


class Purchase(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    product_id: int = Field(foreign_key="product.id")
    transaction_hash: str = Field(unique=True)
    buyer_address: str
    amount_eth: float
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="confirmed")  # confirmed, pending, failed
    block_number: Optional[int] = None
    gas_used: Optional[int] = None


class PurchaseBase(SQLModel, table=False):
    product_id: int
    transaction_hash: str
    buyer_address: str
    amount_eth: float


class PurchaseCreate(SQLModel, table=False):
    product_id: int
    transaction_hash: str
    buyer_address: str
    amount_eth: float
    block_number: Optional[int] = None
    gas_used: Optional[int] = None