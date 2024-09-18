from typing import List, Optional, Dict, Union
from .cuenta_schemas import Cuenta
from pydantic import BaseModel, Field

class ClienteBase(BaseModel):
    nombre: str = Field(..., title= "Nombre del cliente", max_length=50)
    apellido: str = Field(..., title= "Apellido del cliente", max_length=50)
    username: str = Field(..., title= "Usuario del cliente", max_length=50)

class ClienteCreate(ClienteBase):
    contrasena: str = Field(..., title= "Contraseña del cliente")
    cuentas: Optional[List[Cuenta]]

class Cliente(ClienteBase):
    id: int
    cuentas: List[Cuenta] = []
    class Config:
        orm_mode = True


class ClienteUpdate(BaseModel):
    id: int
    nombre: Optional[str]
    apellido: Optional[str]
    username: Optional[str]
    password: str
    new_password: Optional[str]

class Authenticate(BaseModel):
    username: str = Field(..., title= "Username del Cliente", max_length=100)
    password: str = Field(..., title= "Contraseña del Cliente")
