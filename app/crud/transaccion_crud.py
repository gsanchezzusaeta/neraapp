from sqlalchemy.orm import Session
from passlib.context import CryptContext
from fastapi import HTTPException

from ..models import transaccion_model, cuentas_models
from ..schemas import transaccion_schemas

def save_transaction(db: Session,transaccion: transaccion_schemas.TransaccionCreate):

    cuenta_db = db.query(cuentas_models.Cuenta).filter(cuentas_models.Cuenta.id == transaccion.cuenta_id).first()

    if transaccion.tipo == 'Retiro' and cuenta_db.monto < transaccion.monto:
         raise HTTPException(
            status_code=500, detail="El monto que intenta retirar es mayor a la cantidad que tiene en la cuenta")

    if transaccion.tipo == 'Retiro':
        cuenta_db.monto = cuenta_db.monto - transaccion.monto
    elif transaccion.tipo == 'Depósito':
        cuenta_db.monto = cuenta_db.monto + transaccion.monto

    try:
        db.add(cuenta_db)
        db.commit()
        db.refresh(cuenta_db)
    except:
        db.rollback()
        raise HTTPException(
            status_code=500, detail="Problemas al guardar la transaccion")

    print(transaccion_schemas.TipoDeTransaccion[transaccion.tipo])

    db_transaccion = transaccion_model.Transaccion(
        monto = transaccion.monto,
        tipo = transaccion.tipo,
        cuenta_id = transaccion.cuenta_id
    )
    print(transaccion)
    try:
        db.add(db_transaccion)
        db.commit()
        db.refresh(db_transaccion)
        print(db_transaccion.tipo)
        return db_transaccion
    except:
        db.rollback()
        raise HTTPException(
            status_code=500, detail="Problemas al guardar la transaccion")