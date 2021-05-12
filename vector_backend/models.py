from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base


class VectorDoc(Base):
    __tablename__ = 'vector_docs'

    id = Column(Integer, primary_key=True, index=True)
    doc_type = Column(String)
    doc_title = Column(String)
    doc_position = Column(Integer)
