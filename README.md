## How to run the project locally

The application is containerized and will run one service each for backend and frontend.

`cd` in to the project root ie the `vector` directoy and run
- `docker-compose build` to build the images required to run the project.
- `docker-compose up` to start the respective containers for the images mentioned in the docker-compose.yml file.

After this go to `http://localhost:3000/` to view the frontend application.
The API root will be availables at `http://localhost:8000/docs`. This provides a place to check the endpoints exposed by the backend.

## API Design approach
The endpoints exposed work based on queries in `crud.py` file. This file has the functions that will query to get/post the data from/to the database. The database consists of one table called `vector_docs`. This table is connected to the `VectorDoc` model in `models.py` and inherits from the `Base` provided by Sqlalchemy.

## General Questions
Adding a new document is implemented with the 3 input boxes on the page. This calls the `docs/` endpoint to create another document in the database.\

For removing and updating existing items the frontend can provide delete and edit buttons for each card respectively. Clicking on these buttons will call the delete and put endpoints respectively. These endpoints can then be be linked to functions (decorated with `@app.delete()/put()`) that will query the database to delete and update clicked card.\

Letting multiple users edit the board can be achieved using Websockets on fastapi side and using `socketIOClient` in React.
