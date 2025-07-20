
import os
from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Any, Callable, Dict, Optional
from pydantic import BaseModel
from datetime import datetime
import traceback

from sqlmodel import Session, select, SQLModel, Field

from app.models import  Purchase, PurchaseCreate, PurchaseBase, Product, ProductBase
from app.sql_engine import engine 

app = FastAPI()
api_router = APIRouter(prefix="/api")

# create product 
@api_router.post("/create")
async def create_product(product: ProductBase):  # Use ProductBase instead of Product
    try:
        # Convert ProductBase to Product model
        db_product = Product(**product.dict())
        
        with Session(engine) as session:
            session.add(db_product)
            session.commit()
            session.refresh(db_product)
        
        return {"message": "Product created successfully", "product": db_product.model_dump()}
    except Exception as e:
        import traceback
        print("=== CREATE PRODUCT ERROR ===")
        print(f"Input data: {product.dict()}")
        print(f"Error: {str(e)}")
        traceback.print_exc()
        print("============================")
        raise HTTPException(status_code=500, detail=str(e))

# get all the products tho
@api_router.get("/products")
async def read_all_products(limit: int | None = None):
    try:
        with Session(engine) as session:
            statement = select(Product)
            if limit:
                statement = statement.limit(limit)
            products = session.exec(statement).all()
            return {"message": "Products retrieved", "content": [prod.model_dump() for prod in products]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# get product by id
@api_router.get("/products/{id}")
async def get_product_by_id(id: int):
    try:
        with Session(engine) as session:
            product = session.get(Product, id)
            if not product:
                raise HTTPException(status_code=404, detail="Product not found")
            return {"message": "Product found", "content": product.model_dump()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# delete them
@api_router.delete("/product/{id}")
async def remove_product(id: int):
    try:
        with Session(engine) as session:
            product = session.get(Product, id)
            if not product:
                raise HTTPException(status_code=404, detail="Product not found")
            session.delete(product)
            session.commit()
            return {"message": "Product deleted successfully"}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# update product by id
@api_router.patch("/product/{id}")
async def update_product(id: int, column: str, new_value: str):
    try:
        with Session(engine) as session:
            product = session.get(Product, id)
            if not product:
                raise HTTPException(status_code=404, detail="Product not found")
            if not hasattr(product, column):
                raise HTTPException(status_code=400, detail=f"Column '{column}' does not exist")
            current_value = getattr(product, column)
            try:
                if isinstance(current_value, int):
                    converted_value = int(new_value)
                elif isinstance(current_value, float):
                    converted_value = float(new_value)
                elif isinstance(current_value, bool):
                    converted_value = new_value.lower() in ("true", "1", "yes")
                else:
                    converted_value = new_value
                setattr(product, column, converted_value)
                session.add(product)
                session.commit()
                return {"message": "Product updated successfully", "product_id": id}
            except ValueError:
                raise HTTPException(status_code=400, detail=f"Cannot convert '{new_value}' to required type")
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
    
@api_router.post("/purchase")
async def record_purchase(purchase: PurchaseCreate):
    """Record a blockchain purchase in the database"""
    try:
        # Verify product exists
        with Session(engine) as session:
            product = session.get(Product, purchase.product_id)
            if not product:
                raise HTTPException(status_code=404, detail="Product not found")
            
            # Check if transaction already recorded (prevent duplicates)
            existing = session.exec(
                select(Purchase).where(Purchase.transaction_hash == purchase.transaction_hash)
            ).first()
            
            if existing:
                raise HTTPException(status_code=400, detail="Transaction already recorded")
            
            # Create purchase record
            db_purchase = Purchase(**purchase.dict())
            session.add(db_purchase)
            session.commit()
            session.refresh(db_purchase)
            
            return {"message": "Purchase recorded successfully", "purchase": db_purchase.model_dump()}
    
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/purchases/{buyer_address}")
async def get_user_purchases(buyer_address: str):
    """Get all purchases for a specific wallet address"""
    try:
        with Session(engine) as session:
            statement = select(Purchase).where(Purchase.buyer_address == buyer_address)
            purchases = session.exec(statement).all()
            
            # Join with product data
            purchase_data = []
            for purchase in purchases:
                product = session.get(Product, purchase.product_id)
                purchase_info = purchase.model_dump()
                purchase_info['product'] = product.model_dump() if product else None
                purchase_data.append(purchase_info)
            
            return {"message": "Purchases retrieved", "content": purchase_data}
    
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/purchases")
async def get_all_purchases():
    """Get all purchases (admin endpoint)"""
    try:
        with Session(engine) as session:
            statement = select(Purchase)
            purchases = session.exec(statement).all()
            
            purchase_data = []
            for purchase in purchases:
                product = session.get(Product, purchase.product_id)
                purchase_info = purchase.model_dump()
                purchase_info['product'] = product.model_dump() if product else None
                purchase_data.append(purchase_info)
            
            return {"message": "All purchases retrieved", "content": purchase_data}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def get_purchase_stats():
    """Get purchase statistics"""
    try:
        with Session(engine) as session:
            # Total purchases
            total_purchases = session.exec(select(Purchase)).all()
            
            # Total revenue
            total_revenue = sum(purchase.amount_eth for purchase in total_purchases)
            
            # Most popular products
            product_counts = {}
            for purchase in total_purchases:
                product_id = purchase.product_id
                product_counts[product_id] = product_counts.get(product_id, 0) + 1
            
            return {
                "message": "Stats retrieved",
                "content": {
                    "total_purchases": len(total_purchases),
                    "total_revenue_eth": total_revenue,
                    "product_purchase_counts": product_counts
                }
            }
    
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# DO NOT TOUCH ANYTHING BELOW THIS LINE.



if engine is not None:
    try:
        print("[DEBUG] Creating database tables...")
        SQLModel.metadata.create_all(engine)
        print("[DEBUG] Database tables created successfully")
    except Exception as e:
        print(f"[ERROR] Failed to create tables: {e}")
        print("[WARNING] Running without database")
else:
    print("[WARNING] No database connection - some features may not work")

print("[DEBUG] FastAPI app starting...")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router)

# Serve static frontend (build React)
frontend_build_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../frontend/build"))
print("Built at:", frontend_build_dir)
# app.mount("/static", StaticFiles(directory=os.path.join(frontend_build_dir, "static")), name="static")

# Replace the existing static mount with this:
app.mount("/static", StaticFiles(directory=os.path.join(frontend_build_dir, "static")), name="static")

@app.get("/")
async def serve_index():
    return FileResponse(os.path.join(frontend_build_dir, "index.html"))


@app.get("/{full_path:path}")
async def spa_fallback(full_path: str):
    file_location = os.path.join(frontend_build_dir, full_path)
    if os.path.exists(file_location) and os.path.isfile(file_location):
        return FileResponse(file_location)
    # Fallback to index.html for SPA routing
    return FileResponse(os.path.join(frontend_build_dir, "index.html"))