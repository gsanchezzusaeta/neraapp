from optparse import Option
from typing import List, Optional, Dict, Union

from pydantic import BaseModel, Field

class CuentaBase(BaseModel):
    nombre: str = Field(..., title= "Nombre de cuenta", max_length=50)
    numero_de_cuenta: str = Field(..., title= "Numero de cuenta", max_length=50)
    monto: float = Field(..., title="Monto de cuenta")

class Cuenta(CuentaBase):
    id: int
    cliente_id: int
    cliente: List[CuentaBase] = Field(..., title="CUentas del cliente")
    class Config:
        orm_mode = True