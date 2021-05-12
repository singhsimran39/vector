from pydantic import BaseModel


class VectorDocBase(BaseModel):
    doc_type: str
    doc_title: str
    doc_position: str


class VectorDocRequest(VectorDocBase):
    id: int

    class Config:
        orm_mode = True
