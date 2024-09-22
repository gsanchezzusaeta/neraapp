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

    print(db_cliente)
    try:
        db.add(db_cliente)
        db.commit()
        db.refresh(db_cliente)
        return db_cliente
    except:
        db.rollback()
        raise HTTPException(
            status_code=500, detail="Problemas al guardar el cliente")
    


def cuenta_generator(cliente: cliente_schemas.ClienteCreate):
   for cuenta in cliente.cuentas :
      print(cuenta)
      yield cuentas_models.Cuenta(
         nombre = cuenta.nombre,
         numero_de_cuenta = cuenta.numero_de_cuenta,
         monto = cuenta.monto,
         cliente_id = cliente.id
      )

def authenticate_client(db: Session, username: str, password: str):
   
    client = get_cliente_by_username(db, username)
    
    if not client:
        raise HTTPException(status_code=401, detail="El usuario y contraseña no coinciden")  

    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    if not pwd_context.verify(password, client.contrasena):
        raise HTTPException(status_code=401, detail="El usuario y contraseña no coinciden")  
    
    return client