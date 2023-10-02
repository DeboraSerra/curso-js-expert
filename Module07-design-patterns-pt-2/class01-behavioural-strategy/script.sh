docker run \
  --name postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

docker exec -it postgres psql --username postgres --dbname heroes
CREATE TABLE warriors(id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL);


docker run \
  --name mongodbJSExpert \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin \
  -p 27017:27017 \
  -d \
  mongo:4