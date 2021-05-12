from sqlalchemy.orm import Session
import models
import schemas


def get_doc(db: Session, doc_id):
    return db.query(models.VectorDoc).filter(models.VectorDoc.id == doc_id).first()


def get_doc_by_type(db: Session, doc_type):
    return db.query(models.VectorDoc).filter(models.VectorDoc.doc_type==doc_type).first()


def get_docs(db: Session, skip=0, limit=100):
    return db.query(models.VectorDoc).offset(skip).limit(limit).all()


def create_doc(db: Session, doc: schemas.VectorDocBase):
    db_doc = models.VectorDoc(
        doc_type=doc.doc_type, doc_title=doc.doc_title, doc_position=doc.doc_position
    )
    db.add(db_doc)
    db.commit()
    db.refresh(db_doc)
    return db_doc
