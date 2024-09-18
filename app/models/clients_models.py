from sqlalchemy import Table, Column, String, Text, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship, Mapped
from ..database import Base
from .cuentas_models import Cuenta

class Cliente(Base):
    __tablename__='cliente'
    id = Column(Integer, primary_key=True)
    contrasena = Column(String, nullable=False)
    nombre = Column(String(50), nullable=False)
    apellido = Column(String(50), nullable=False)
    username = Column(String(50), index=True, unique=True)
    cuentas = relationship("Cuenta")