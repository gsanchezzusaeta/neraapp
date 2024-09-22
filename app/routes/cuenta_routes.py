
from fastapi import Depends, APIRouter, HTTPException, Query
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..schemas import cuenta_schemas
from ..crud import cliente_crud, cuenta_crud
from typing import List
from ..database import get_db

router = APIRouter()

@router.get("", response_model=List[cuenta_schemas.Cuenta])
def read_cuentas(db: Session = Depends(get_db)):
    cuentas = cuenta_crud.get_all_cuentas(db)
    return cuentas

@router.get("/{id}/balance")
def read_cuenta_monto(id: int, db: Session = Depends(get_db)):
    cuenta = cuenta_crud.get_cuenta_by_id(db, id)
    return cuenta.monto

@router.post("")
def create_cuenta(cuenta: cuenta_schemas.CuentaCreate, db: Session= Depends(get_db)):
    cliente_db = cliente_crud.get_cliente_by_id(db, cuenta.cliente_id)
    if not cliente_db:
        raise HTTPException(status_code=401, detail="El id del usuario especificado no existe") 
    
    cuenta_by_nro_db = cuenta_crud.get_cuenta_by_nro(db,cuenta.numero_de_cuenta)

    if cuenta_by_nro_db:
        raise HTTPException(status_code=401, detail="El numero de cuenta ya existe") 

    return cuenta_crud.save_cuenta(db, cuenta)

@router.delete("")
def create_cliente(id: int, db: Session= Depends(get_db)):  
    return cuenta_crud.delete_cuenta(db, id)

