import os
from fastapi import FastAPI, APIRouter
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles

from fastapi.middleware.cors import CORSMiddleware

from starlette.status import HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR, HTTP_404_NOT_FOUND, HTTP_403_FORBIDDEN, HTTP_400_BAD_REQUEST

from typing import Callable, Dict, Literal, Any, List

from sqlmodel import Field, Session, SQLModel, create_engine, select

from .models import ProductModel, Product
from .sql_engine import engine

# for use in read products with filter
import operator


app = FastAPI()
api_router = APIRouter(prefix="/api")

# api goes here

@api_router.post("/create")
async def create_product(product: ProductModel) -> JSONResponse:
    """
    Args:
        product (ProductModel): Create product and push to database
    """
    try:
        # Convert ProductModel (Pydantic) to Product (SQLModel)
        db_product = Product(**product.model_dump())
        with Session(engine) as session:
            session.add(db_product)
            session.commit()
            session.refresh(db_product)
        return JSONResponse(
            status_code=HTTP_200_OK,
            content={
                "message": "Product created successfully.",
                "product": db_product.id
            }
        )
    except Exception as e:
        return JSONResponse(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "message": "Error: created product failure",
                "product": getattr(product, "id", None),
                "error": str(e)
            }
        )
        
    
# needs to return JSON dump, all for frontend


@api_router.get("/products/{id}")
def get_product_by_id(id: int) -> JSONResponse:
    """_summary_
    
    Gets a single product by its ID.
    Args:
        id (int): _description_

    Returns:
        JSONResponse: _description_
    """
    try:
        with Session(engine) as session:
            statement = select(Product).where(Product.id == id)
            result = session.exec(statement).one_or_none()
            return JSONResponse(
                status_code=HTTP_200_OK,
                content={
                    "message": "Retrieved product successfully",
                    "content": result.model_dump_json() if result is not None else ""
                }
            )
    except Exception as e:
        return JSONResponse(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "message": "Error: Retrieving products failed",
                "error": str(e)
            }
        )            

async def read_products_with_filter(conditions: List[str], limit: int | None = None) -> JSONResponse:
    """_summary_

    Args:
        conditions: List[str].
        Should be in the form of a Python list of conditions of columns
        e.g. ["price > 10", "quantity < 15"]

    Returns:
        JSONResponse: The result of the operation
        
        
    """
    
    operator_map: Dict[str, Callable[[Any, Any], Any]] = {
        "<": operator.lt,
        ">": operator.gt,
        "=": operator.eq,
    }
    
    
    try:
        with Session(engine) as session:
            statement = select(Product)
            if limit is not None:
                statement = statement.limit(limit)
                
            # https://www.youtube.com/watch?v=Cmj8FDbUdF8
            # the ends justify the means
            for condition in conditions:
                column, relation, value = condition.split()
                
                attr = getattr(Product, column)
                # ah yes, fine, exquisite, *casting*
                value = type(attr)(value)

                # what the fuck
                statement = statement.where(
                    operator_map[relation](attr, value)
                )
            result = session.exec(statement).all()
        return JSONResponse(
                status_code=HTTP_200_OK,
                content={
                    "message": "Retrieved product(s) successfully",
                    "content": [prod.model_dump() for prod in result]
                }
            )
    except Exception as e:
        return JSONResponse(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "message": "Error: Retrieving Products Failed",
                "error": str(e)
            }
        )

@api_router.get("/products")    
async def read_all_products(limit: int | None = None) -> JSONResponse:
    """_summary_

    Args:
        limit (int | None, optional): Return the maximum number of products retrieved. None for no limit. Defaults to None.
        

    Returns:
        JSONResponse: The result of the operation
    """
    return await read_products_with_filter([], limit)
    
@api_router.delete("/product/{id}")
async def remove_product(id: int) -> JSONResponse:
    """_summary_

    Args:
        id (int): Remove all products with ID as id.
        Removal by id
    """
    try:
        with Session(engine) as session:
            product = get_product_by_id(id)
            if product.status_code == HTTP_200_OK:
                # result = product.
                pass
        return JSONResponse(
            status_code=HTTP_200_OK,
            content={
                "message": "Product Deleted Successfully"
            }
        )
    except Exception as e:
        return JSONResponse(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "message": "Error: Fail to Delete Product",
                "error": str(e)
            }
        )

@api_router.patch("/product/{id}")
async def update_product(id: int, column: str, new_value: str) -> JSONResponse:
    """
    Update a specific column of a product with a new value.

    Args:
        id (int): Product ID to update
        column (str): Column name to update
        new_value (str): New value as string (will be converted to appropriate type)
    """
    try:
        with Session(engine) as session:
            # Get product directly from database
            product = get_product_by_id(id)
            
            if product is None:
                return JSONResponse(
                    status_code=HTTP_404_NOT_FOUND,
                    content={"message": f"Product with ID {id} not found"}
                )
            
            # Verify column exists
            if not hasattr(product, column):
                return JSONResponse(
                    status_code=HTTP_400_BAD_REQUEST,
                    content={"message": f"Column '{column}' does not exist"}
                )
            
            # Get current type and convert new_value accordingly
            current_value = getattr(product, column)
            try:
                if isinstance(current_value, int):
                    converted_value = int(new_value)
                elif isinstance(current_value, float):
                    converted_value = float(new_value)
                elif isinstance(current_value, bool):
                    converted_value = new_value.lower() in ("true", "1", "yes")
                else:
                    # For strings and other types
                    converted_value = new_value
                
                # Update the attribute
                setattr(product, column, converted_value)
                session.add(product)
                session.commit()
                
                return JSONResponse(
                    status_code=HTTP_200_OK,
                    content={
                        "message": "Product updated successfully",
                        "product": id
                    }
                )
            except ValueError:
                return JSONResponse(
                    status_code=HTTP_400_BAD_REQUEST,
                    content={"message": f"Cannot convert '{new_value}' to required type for column '{column}'"}
                )
    except Exception as e:
        return JSONResponse(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "message": "Error: Failed to update product",
                "error": str(e)
            }
        )


# DO NOT TOUCH ANYTHING BELOW THIS LINE.

SQLModel.metadata.create_all(engine)
app.add_middleware(
    CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
app.include_router(api_router)
# At the bottom of your file, replace the mounting code with this:

frontend_build_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../frontend/build"))

# Serve static files (JS, CSS, images) from a specific path
app.mount("/static", StaticFiles(directory=os.path.join(frontend_build_dir, "static")), name="static")

# Handle the root route
@app.get("/")
async def serve_index():
    return FileResponse(os.path.join(frontend_build_dir, "index.html"))

# Handle any other route with the SPA fallback
@app.get("/{full_path:path}")
async def spa_fallback(full_path: str):
    # Return index.html for any route that doesn't match API or static files
    index_path = os.path.join(frontend_build_dir, "index.html")
    return FileResponse(index_path)