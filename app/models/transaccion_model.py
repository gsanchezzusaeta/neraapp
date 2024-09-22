import enum
from sqlalchemy import Table, Column, String, Text, Integer, Boolean, ForeignKey, Float, DateTime, Enum
from sqlalchemy.orm import relationship
from ..database import Base
from sqlalchemy.sql import func
from ..schemas.transaccion_schemas import TipoDeTransaccion

class Transaccion(Base):
    __tablename__='transaccion'
    id = Column(Integer, primary_key=True)
    monto = Column(Float, nullable=False)
    fecha_realizada = Column(DateTime, server_default=func.now(), nullable=False)
    tipo = Column(Enum(TipoDeTransaccion))   

    cuenta_id = Column(Integer, ForeignKey("cuenta.id"))
    cuenta = relationship("Cuenta", back_populates="transacciones")
