import enum
from sqlalchemy import Table, Column, String, Text, Integer, Boolean, ForeignKey, Float, DateTime, Enum
from sqlalchemy.orm import relationship
from ..database import Base
from sqlalchemy.sql import func
from ..schemas.transaccion_schemas import TipoDeTransaccion
import datetime
 
class Transaccion(Base):
    __tablename__='transaccion'
    id = Column(Integer, primary_key=True)
    monto = Column(Float, nullable=False)
    fecha_realizada = Column(DateTime, default=datetime.datetime.now)
    tipo = Column(Enum(TipoDeTransaccion))   

    cuenta_id = Column(Integer, ForeignKey("cuenta.id"))
    cuenta = relationship("Cuenta", back_populates="transacciones")
