from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# import os
# os.system("pwd")

from fastapi import APIRouter
api_router = APIRouter(prefix="/api")

@api_router.get("/random")
async def random():
    return {"Welcome!"}

app.include_router(api_router)

app.mount("/", app=StaticFiles(directory="../../frontend/build", html=True), name="app")



