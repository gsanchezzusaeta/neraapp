from sqlalchemy.orm import Session
from passlib.context import CryptContext
from fastapi import HTTPException

from ..models import clients_models, cuentas_models
from ..schemas import cliente_schemas

def get_all_clientes(db: Session) :

    clientes = db.query(clients_models.Cliente).all()

    return clientes

def get_cliente_by_username(db: Session, username: str) -> clients_models.Cliente:
    return db.query(clients_models.Cliente).filter(clients_models.Cliente.username == username).first()

def get_cliente_by_id(db: Session, id: int) -> clients_models.Cliente:
    return db.query(clients_models.Cliente).filter(clients_models.Cliente.id == id).first()


def save_cliente(db: Session, cliente: cliente_schemas.ClienteCreate):

    
    pwd = cliente.contrasena
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    cliente.contrasena = pwd_context.hash(pwd)

    db_cliente = clients_models.Cliente(
        contrasena = cliente.contrasena,
        nombre = cliente.nombre,
        apellido = cliente.apellido,
        username = cliente.username,
        cuentas = []
    )
    try:
        db.add(db_cliente)
        db.commit()
        db.refresh(db_cliente)
        return db_cliente
    except:
        db.rollback()
        raise HTTPException(
            status_code=500, detail="Problemas al guardar el cliente")
    

def update_cliente(db: Session, cliente_new: cliente_schemas.ClienteUpdate):
    
    cliente = db.query(clients_models.Cliente).filter(clients_models.Cliente.id == cliente_new.id).first()
    if cliente == None:
        raise HTTPException(status_code=400, detail="El cliente no existe")

    try:
        if cliente_new.nombre: cliente.nombre = cliente_new.nombre
        if cliente_new.apellido: cliente.apellido = cliente_new.apellido
        if cliente_new.username: cliente.username = cliente_new.username

        if cliente_new.cuentas:
            cuentas = []
            for cuenta in cliente_new.cuenta:
                db_cuenta = db.query(cuentas_models.Cuenta).filter(cuentas_models.nombre == cuenta).first()
                if not db_cuenta:
                    raise HTTPException(status_code=404, detail="Una de las cuentas indicadas no existe")
                cuentas.append(db_cuenta)
            cliente.cuentas = cuentas
        db.commit()
        return cliente
    except Exception as e:
        print(e)
        db.rollback()
        raise HTTPException(
            status_code=500, detail="Problemas al actualizar el cliente")