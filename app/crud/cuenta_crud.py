from sqlalchemy.orm import Session
from passlib.context import CryptContext
from fastapi import HTTPException

from ..models import clients_models, cuentas_models
from ..schemas import cuenta_schemas

def get_all_cuentas(db: Session) :
    return db.query(clients_models.Cuenta).all()

def get_cuenta_by_id(db: Session, id:int) -> clients_models.Cuenta:
    return db.query(clients_models.Cuenta).filter(clients_models.Cuenta.id == id).first()

def get_cuenta_by_nro(db: Session, nro: int) -> clients_models.Cuenta:
    return db.query(clients_models.Cuenta).filter(clients_models.Cuenta.numero_de_cuenta == nro).first()


def save_cuenta(db: Session,cuenta: cuenta_schemas.CuentaBase):

    db_cuenta = cuentas_models.Cuenta(
        nombre = cuenta.nombre,
        numero_de_cuenta = cuenta.numero_de_cuenta,
        monto = cuenta.monto,
        cliente_id = cuenta.cliente_id
    )

    print(db_cuenta)
    try:
        db.add(db_cuenta)
        db.commit()
        db.refresh(db_cuenta)
        return db_cuenta.id
    except:
        db.rollback()
        raise HTTPException(
            status_code=500, detail="Problemas al guardar la cuenta")
    
def delete_cuenta(db: Session, id: int):

    try:
        cuenta = db.query(cuentas_models.Cuenta).filter(cuentas_models.Cuenta == id).first()
        db.delete(cuenta)
        db.commit()
        return
    except Exception as e:
        db.rollback()
        print(e)
        raise HTTPException(
            status_code=500, detail="Problemas al eliminar la cuenta")