from sqlalchemy import Table, Column, String, Text, Integer, Boolean, ForeignKey, Float, BigInteger, DateTime, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship, Mapped
from ..database import Base
from .transaccion_model import Transaccion

class Cuenta(Base):
    __tablename__='cuenta'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(50), nullable=False)
    numero_de_cuenta = Column(BigInteger, nullable=False, unique=True)
    monto = Column(Float, nullable=False)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    cliente_id = Column(Integer, ForeignKey("cliente.id"))
    cliente = relationship("Cliente", back_populates="cuentas")
    transacciones = relationship("Transaccion", back_populates="cuenta")
