from optparse import Option
from typing import List, Optional, Dict, Union
from .cuenta_schemas import CuentaBase 
from pydantic import BaseModel, Field

class ClienteBase(BaseModel):
    nombre: str = Field(..., title= "Nombre del cliente", max_length=50)
    apellido: str = Field(..., title= "Apellido del cliente", max_length=50)
    username: str = Field(..., title= "Usuario del cliente", max_length=50)

class ClienteCreate(ClienteBase):
    contrasena: str = Field(..., title= "Contraseña del cliente")
    cuentas: Optional[list]

class Cliente(ClienteBase):
    id: int
    cuentas: Optional[List[CuentaBase]] = Field(..., title="Sucursales a las que tiene acceso el usuario")
    class Config:
        orm_mode = True


class ClienteUpdate(BaseModel):
    id: int
    nombre: Optional[str]
    apellido: Optional[str]
    username: Optional[str]
    password: str
    new_password: Optional[str]