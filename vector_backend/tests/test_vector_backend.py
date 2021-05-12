from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database import Base
from main import app, get_db


SQLALCHEMY_DATABASE_URL = 'sqlite:///./test.db'

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={'check_same_thread': False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


def test_read_item():
    doc_1 = {
        'doc_type': 'foobar', 'doc_title': 'Foo Bar', 'doc_position': '1'
    }
    client.post('/docs/', json=doc_1)
    response = client.get('/docs/1')
    assert response.status_code == 200


def test_read_inexistent_item():
    response = client.get('/docs/2')
    assert response.status_code == 404
    assert response.json() == {'detail': 'Document not found'}


def test_create_doc():
    doc_1 = {
        'doc_type': 'foobar2', 'doc_title': 'Foo Bar 2', 'doc_position': '2'
    }
    response = client.post('/docs/', json=doc_1)
    assert response.status_code == 200

    # check we cant create another with same doc_type
    doc_2 = {
        'doc_type': 'foobar2', 'doc_title': 'Foo Bar 3', 'doc_position': '3'
    }
    response = client.post('/docs/', json=doc_1)
    assert response.status_code == 400
