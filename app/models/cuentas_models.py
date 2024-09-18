from sqlalchemy import Table, Column, String, Text, Integer, Boolean, ForeignKey, Float
from sqlalchemy.orm import relationship, Mapped
from ..database import Base
 
class Cuenta(Base):
    __tablename__='cuenta'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(50), nullable=False)
    numero_de_cuenta = Column(String(50), nullable=False)
    monto = Column(Float, nullable=False)

    cliente_id = Column(Integer, ForeignKey("cliente.id"))
    cliente = relationship("Cliente", back_populates="cuentas")
