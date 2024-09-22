
from fastapi import Depends, APIRouter, HTTPException, Query
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..schemas import transaccion_schemas
from ..crud import transaccion_crud, cuenta_crud
from typing import List
from ..database import get_db

router = APIRouter()

# @router.get("", response_model=List[cuenta_schemas.Cuenta])
# def read_cuentas(db: Session = Depends(get_db)):
#     cuentas = cuenta_crud.get_all_cuentas(db)
#     return cuentas


@router.post("", response_model=transaccion_schemas.Transaccion)
def create_cuenta(transaccion: transaccion_schemas.TransaccionCreate, db: Session= Depends(get_db)):
    cuenta_db = cuenta_crud.get_cuenta_by_id(db, transaccion.cuenta_id)
    if not cuenta_db:
        raise HTTPException(status_code=401, detail="El id de la cuenta especificada no existe") 
    return transaccion_crud.save_transaction(db, transaccion)
