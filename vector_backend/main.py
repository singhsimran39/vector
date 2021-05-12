from typing import List
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, FastAPI, HTTPException

import crud, models, schemas
from database import SessionLocal, engine


models.Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post('/docs/', response_model=schemas.VectorDocRequest)
def create_doc(doc: schemas.VectorDocBase, db=Depends(get_db)):
    db_doc = crud.get_doc_by_type(db, doc_type=doc.doc_type)
    if db_doc:
        raise HTTPException(status_code=400, detail=f'Document of type {db_doc.doc_type} already created')
    return crud.create_doc(db=db, doc=doc)


@app.get('/docs/', response_model=List[schemas.VectorDocRequest])
def read_docs(skip=0, limit=100, db=Depends(get_db)):
    docs = crud.get_docs(db, skip=skip, limit=limit)
    return docs


@app.get('/docs/{doc_id}', response_model=schemas.VectorDocRequest)
def read_doc(doc_id: int, db=Depends(get_db)):
    db_doc = crud.get_doc(db, doc_id=doc_id)
    if db_doc is None:
        raise HTTPException(status_code=404, detail='Document not found')
    return db_doc
