from fastapi import FastAPI, APIRouter, 
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from fastapi.middleware.cors import CORSMiddleware

from starlette.status import HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR, HTTP_404_NOT_FOUND, HTTP_403_FORBIDDEN

from typing import Dict, Literal, Any, List

from sqlmodel import Field, Session, SQLModel, create_engine, select

from .models import ProductModel, Product
from .sql_engine import engine



app = FastAPI()
api_router = APIRouter(prefix="/api")

# api goes here

@api_router.post("/create-product")
async def create_product(product: ProductModel) -> JSONResponse:
    """_summary_

    Args:
        product (ProductModel): Create product and push to database
    """
    
    # IS THIS IT LMAO
    try:
        with Session(engine) as session:
            session.add(product)
            session.commit()
        return JSONResponse(
            status_code=HTTP_200_OK,
            content={
                "message": "Product created successfully.",
                "product": product.model_dump()
            }
        )
    except Exception as e:
        return JSONResponse(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "message": "Error: created product failure",
                "product": product.model_dump(),
                "error": str(e)
            }
        ) 
        
    
@api_router.get("/products")    
async def read_all_products(limit: int | None = None) -> JSONResponse:
    try:
        with Session(engine) as session:
            statement = select(Product)
            if limit is not None:
                statement = statement.limit(limit)
            result = session.exec(statement).all()
            return JSONResponse(
                status_code=HTTP_200_OK,
                content={
                    "message": "Retrieved product(s) successfully",
                    "content": {idx: prod.model_dump() for idx, prod in enumerate(result)}
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
                status_code=201,
                content={
                    "message": "Retrieved product(s) successfully",
                    "content": result.model_dump() if result is not None else ""
                }
            )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "message": "Error: Retrieving products failed",
                "error": str(e)
            }
        )            

async def read_products_with_filter(conditions: List[str], limit: int | None = None) -> Any:
    """_summary_

    Args:
        attribute (Dict[str, str]): Filter attributes for product

    Returns:
        List[ProductModel]: A list containing the attributes.
        
        Should be in the form of a Python list of conditions of columns
        e.g. ["price > 10", "quantity < 15"]
    """
    try:
        with Session(engine) as session:
            statement = select(Product)
            if limit is not None:
                statement = statement.limit(limit)
                
            # https://www.youtube.com/watch?v=Cmj8FDbUdF8
            # the ends justify the means
            for condition in conditions:
                attribute, relation, value = condition.split()
                statement = statement.where(bool(
                    eval(f"Product.{attribute} {relation} {value}")
                ))
            result = session.exec(statement).all()
        return JSONResponse(
                status_code=201,
                content={
                    "message": "Retrieved product(s) successfully",
                    "content": {idx: prod.model_dump() for idx, prod in enumerate(result)}
                }
            )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "message": "Error: Retrieving Products Failed",
                "error": str(e)
            }
        )
    
    
@api_router.delete("/product/{id}")
async def remove_product(id: int) -> JSONResponse:
    """_summary_

    Args:
        product (ProductModel): Remove all products with ID as id.
        Removal by id
    """
    try:
        with Session(engine) as session:
            product = get_product_by_id(id)
            if product.status_code == 201:
                result = product.
        return JSONResponse(
            status_code=201,
            content={
                "message": "Product Deleted Successfully"
            }
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "message": "Error: Fail to Delete Product",
                "error": str(e)
            }
        )

@api_router.patch("/product/{id}")
async def update_product(id: int, new_values: Dict[str, str]) -> None:
    """

    Args:
        attributes (Dict[str, str]): Select set of attributes to identify value(s)
        new_values (Dict[str, str]): New values to update accordingly.
        
        Update product to use 
    """
    with Session(engine) as session:
        pass
    pass


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
app.mount("/", app=StaticFiles(directory="../../frontend/build", html=True), name="app")