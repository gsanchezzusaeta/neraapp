
from fastapi import Depends, APIRouter, HTTPException, Query
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..schemas import cliente_schemas
from ..crud import cliente_crud
from typing import List
from ..database import get_db
import json

router = APIRouter()

def format_clientes_response(clientes):
    return  [{ k: v for k, v in x.__dict__.items() if k != 'contrasena'} for x in clientes]

@router.get("", response_model=List[cliente_schemas.Cliente])
def read_clientes(db: Session = Depends(get_db)):
    clientes = cliente_crud.get_all_clientes(db)
    return clientes

@router.get("/{id}", response_model=cliente_schemas.Cliente)
def read_cliente_by_id(id:int, db: Session = Depends(get_db)):
    cliente_db = cliente_crud.get_cliente_by_id(db, id)
    return cliente_db


@router.post("", response_model=cliente_schemas.Cliente)
def create_cliente(cliente: cliente_schemas.ClienteCreate, db: Session= Depends(get_db)):
    cliente_db = cliente_crud.get_cliente_by_username(db, cliente.username)
    if cliente_db:
        raise HTTPException(status_code=401, detail="Ya existe un cliente registrado con ese email")    
    return cliente_crud.save_cliente(db, cliente)


