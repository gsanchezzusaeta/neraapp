
from fastapi import Depends, APIRouter, HTTPException, Query
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..schemas import cliente_schemas
from ..crud import cliente_crud
from typing import List
from ..database import get_db

router = APIRouter()

def format_clientes_response(clientes):
    '''Formatea los campos que devuelve la API para evitar devolver la contraseña'''
    return  [{ k: v for k, v in x.__dict__.items() if k != 'contrasena'} for x in clientes]

@router.get("", response_model=List[cliente_schemas.Cliente])
def read_clientes(db: Session = Depends(get_db)):
    clientes = cliente_crud.get_all_clientes(db)
    return format_clientes_response(clientes)


@router.post("", response_model=cliente_schemas.Cliente)
def create_cliente(cliente: cliente_schemas.ClienteCreate, db: Session= Depends(get_db)):
    cliente_db = cliente_crud.get_cliente_by_username(db, cliente.username)
    if cliente_db:
        raise HTTPException(status_code=401, detail="Ya existe un cliente registrado con ese email")    
    return cliente_crud.save_cliente(db, cliente)

@router.patch("", response_model=cliente_schemas.Cliente)
async def update_cliente_api(cliente:cliente_schemas.ClienteUpdate,db: Session = Depends(get_db)):

    cliente_db = cliente_crud.get_cliente_by_id(db, cliente.id)
    if cliente_db.username != cliente.username:
        cliente_email = cliente_crud.get_cliente_by_username(db, cliente.username)
        if cliente_email:
            raise HTTPException(status_code=401, detail="Ya existe un cliente registrado con ese email")   
    
    updated_user = cliente_crud.update_cliente(db,cliente)
    if cliente.sucursales and token["email"] == cliente.email:
        token["sucursales"] = cliente.sucursales
    redis_connection.set(token["token"], json.dumps(token))

    return updated_user



