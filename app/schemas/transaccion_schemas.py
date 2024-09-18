from typing import List, Optional, Dict, Union

from pydantic import BaseModel, Field

class TransaccionBase(BaseModel):
    nombre: str = Field(..., title= "Nombre de cuenta", max_length=50)
    numero_de_cuenta: str = Field(..., title= "Numero de cuenta")
    tipo: str = Field(..., title="Tipo de cuenta")
    monto: float = Field(..., title="Monto de cuenta")