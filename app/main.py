import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from passlib.context import CryptContext

from .database import Base, engine, SessionLocal, get_db
from .models.clients_models import Cliente
from .models.cuentas_models import Cuenta
from .routes import cliente_routes, cuenta_routes

Base.metadata.create_all(bind=engine)

app = FastAPI()

#mock data

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

cliente1 = Cliente(nombre="Guido", apellido="Sanchez", username="guidosanchez", contrasena=pwd_context.hash("nerapp123"), cuentas=[])
cliente2 = Cliente(nombre="Juan", apellido="Lopez", username="juancitolopez", contrasena=pwd_context.hash("soyjuanlop"), cuentas=[])
cliente3 = Cliente(nombre="Viviana", apellido="Mendez", username="vivimen", contrasena=pwd_context.hash("soyviviana"), cuentas=[])
cliente4 = Cliente(nombre="Ricardo", apellido="Molares", username="rickyricon", contrasena=pwd_context.hash("rickyfort"), cuentas=[])
cliente5 = Cliente(nombre="Tony", apellido="Montana", username="scarface", contrasena=pwd_context.hash("sayhellotomylittlefriend"), cuentas=[])

cuenta1 = Cuenta(nombre="Cuenta BBVA", numero_de_cuenta=10020310022, monto=12032.22, cliente_id=1)
cuenta2 = Cuenta(nombre="Cuenta Santander", numero_de_cuenta=10020310021, monto=322032.22, cliente_id=3)
cuenta3 = Cuenta(nombre="Cuenta Miami", numero_de_cuenta=10020310024, monto=12032.22, cliente_id=4)
cuenta4 = Cuenta(nombre="Cuenta 'Legal'", numero_de_cuenta=10020310054, monto=12032.22, cliente_id=5)

cliente1.cuentas.append(cuenta1)
cliente3.cuentas.append(cuenta2)
cliente4.cuentas.append(cuenta3)
cliente5.cuentas.append(cuenta4)


app.include_router(cliente_routes.router, prefix="/client", tags=["cliente"])
app.include_router(cuenta_routes.router, prefix="/account", tags=["cliente"])

async def add_data():
    db = get_db()
    if db:
        session = SessionLocal()
        clienteCount = session.query(Cliente).count()
        if not clienteCount:
            session.add(cliente1)
            session.add(cliente2)
            session.add(cliente3)
            session.add(cliente4)
            session.add(cliente5)
            session.commit()
        


@app.on_event("startup")              #new
async def app_startup():
    #Creo data mockeada en DB
    await add_data()