from sqlalchemy import Table, Column, String, Text, Integer, Boolean, ForeignKey, Float
from sqlalchemy.orm import relationship
from ..database import Base

class Transaccion(Base):
    __tablename__='transaccion'
    id = Column(Integer, primary_key=True)
    tipo = Column(String(50), ForeignKey("tipo.nombre"))
    monto = Column(Float, primary_key=True)


class TipoTransaccion(Base):
    __tablename__='transaccion'
    nombre = Column(String(50), primary_key=True, nullable=False)
    descripcion = Column(Text)
