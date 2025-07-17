from typing import Optional
from sqlmodel import SQLModel, Field
from pydantic import BaseModel
from datetime import datetime


class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: str
    price: float  # Price in ETH

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    in_stock: bool = True


class ProductCreate(SQLModel, table=False):  # ✅ Explicitly say it's not a table
    name: str = Field(min_length=1, max_length=200)
    description: str = Field(min_length=1, max_length=1000)
    price: float = Field(gt=0)
    currency: str = Field(default="ETH", max_length=10)
    quantity: int = Field(default=1, ge=0)
    asset_type: str = Field(default="digital", max_length=50)
    category: str = Field(default="Other", max_length=50)
    owner: str = Field(min_length=42, max_length=42)
    img: Optional[str] = Field(default=None, max_length=500)

class Purchase(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    product_id: int = Field(foreign_key="product.id")
    transaction_hash: str = Field(unique=True)  # Blockchain transaction hash
    buyer_address: str  # Ethereum wallet address
    amount_eth: float  # Amount paid in ETH
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="confirmed")  # confirmed, pending, failed
    block_number: Optional[int] = Field(default=None)  # Blockchain block number
    gas_used: Optional[int] = Field(default=None)  # Gas used for transaction

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
