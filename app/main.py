import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .models.clients_models import Cliente

from .routes import cliente_routes

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(cliente_routes.router, prefix="/cliente", tags=["cliente"])


