from enum import Enum, unique
from datetime import datetime
from typing import List, Optional, Dict, Union
from pydantic import BaseModel, Field


@unique
class TipoDeTransaccion(str,Enum):
    Retiro = 'Retiro'
    Depósito = 'Depósito'

class TransaccionBase(BaseModel):
    monto: float = Field(..., title="Monto de transaccion")
    fecha_realizada: datetime = Field(..., title="Fecha de transacción")
    tipo: TipoDeTransaccion

class TransaccionCreate(BaseModel):
    monto: float = Field(..., title="Monto de transaccion")
    tipo: TipoDeTransaccion
    cuenta_id: int = Field(..., title="ID de cuenta")

class Transaccion(TransaccionBase):
    id: int
    cuenta_id: int = Field(..., title="ID de cuenta")
    class Config:
        orm_mode = True
