<h1 align="center"> Movie Service </h1> <br>

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Testing](#testing)
- [API](#api)
- [CI/CD Pipeline](#cicd-pipeline)

## Introduction
### 1) Movie Service 
We'd like you to build a simple Movie API. It should provide two endpoints:

:speaking_head: Movie service code is located under `./movie` directory

1. `POST /movies`
   1. Allows creating a movie object based on movie title passed in the request body
   2. Based on the title additional movie details should be fetched from
      https://omdbapi.com/ and saved to the database. Data we would like you to
      fetch from OMDb API:
   ```
     Title: string
     Released: date
     Genre: string
     Director: string
   ```
   3. Only authorized users can create a movie.
   4. `Basic` users are restricted to create 5 movies per month (calendar
      month). `Premium` users have no limits.
      
2. `GET /movies`
   1. Should fetch a list of all movies created by an authorized user.

⚠️ Don't forget to verify user's authorization token before processing the
request. The token should be passed in request's `Authorization` header.
```
Authorization: Bearer <token>
```

### 2) Authorization service
To authorize users please use our simple auth service based on JWT tokens.

:speaking_head: Auth service code is located under `./auth` directory

#### <ins>*JWT Secret*</ins>

To generate tokens in auth service you need to provide env variable`JWT_SECRET`. It should be a string value. You should use the same secret in
the Movie API you're building to verify the JWT tokens.

#### <ins>*Users*</ins>

The auth service defines two user accounts that you should use

1. `Basic` user

```
 username: 'basic-thomas'
 password: 'sR-_pcoow-27-6PAwCD8'
```

1. `Premium` user

```
username: 'premium-jim'
password: 'GBLtTyq3E_UNjFnpo9m6'
```


#### <ins>*Token payload*</ins>

Decoding the auth token will give you access to basic information about the
user, including its role.
Decoding the auth token will give you access to basic information about the
user, including its role.

```
{
  "userId": 123,
  "name": "Basic Thomas",
  "role": "basic",
  "iat": 1606221838,
  "exp": 1606223638,
  "iss": "https://www.netguru.com/",
  "sub": "123"
}
```

## Features

- Database - MongoDB
- API is dockerized. Includes `Dockerfile` and `docker-compose` and README.md with information about how to run it locally
- Provided solution should consist of two microservices.
  - `Authentication Service` - To auth users
  - `Movie Service` - To handle movies data
- Integration test included.
- Provided Swagger  Documentation of the API.
- Application is pushed to the public git repository and have a working CI/CD pipeline that runs the tests using GitHub Actions. Includes a sample PR to show the working CI/CD pipeline.

## Requirements
You need to have `docker` and `docker-compose` installed on your computer to run the service

## Quick Start

1. Clone this repository
2. In the root dir
   - Create a **`.env`** file. Enviornmental variables for both auth service and movie service is placed in this file
   - Copy **`.env.sample`** content and paste it in the **`.env`**
   - Override **`OMDB_API_KEY`** in **`.env`** with your OMDb API Key

| Service | ENV VARIABLE          | DEFAULT                 | Can I override the default value? |
|---------|-----------------------|-------------------------|-----------------------------------|
| auth    | JWT_SECRET            | secret                  | OPTIONAL                          |
|         | APP_PORT              | 3000                    | OPTIONAL                          |
| movie   | OMDB_API_URL          | https://www.omdbapi.com | OPTIONAL                          |
|         | OMDB_API_KEY          | 123456                  | **REQUIRED**                      |
|         | MONGODB_USER          | root                    | OPTIONAL                          |
|         | MONGODB_PASSWORD      | 123456                  | OPTIONAL                          |
|         | MONGODB_DATABASE      | movies                  | OPTIONAL                          |
|         | MONGODB_DATABASE_TEST | movies_test             | OPTIONAL                          |
|         | MONGODB_LOCAL_PORT    | 7017                    | OPTIONAL                          |
|         | MONGODB_DOCKER_PORT   | 27017                   | **DO NOT CHANGE**                 |
|         | NODE_LOCAL_PORT       | 4000                    | OPTIONAL                          |
|         | NODE_DOCKER_PORT_TEST | 4002                    | OPTIONAL                          |
|         | NODE_DOCKER_PORT      | 4001                    | OPTIONAL                          |
  
3. Run from root dir

### Run Local

```
# Build
docker-compose up -d

# Check state of of all the containers
docker-compose ps
```

 *We assume that the movie service is running of the default port `4000` and auth service is running of the default port `3000`*

- Enter http://localhost:3000/api-docs in a browser to see the auth application running. 
- Enter http://localhost:4000/api-docs in a browser to see the movie application running.

```
# (Optional) If state is not `Up`, inspect the logs to find out what errors are occurring 
docker-compose logs --follow

# (Optional) Fix the issue, rebuild and restart the containers
docker-compose up -d --build

# In the end, stop and remove containers, networks, images, and volumes
docker-compose down
```

## Testing

```
# run integration test
docker-compose run movie npm run test

# run integration test in watchAll mode. This will watch files for changes and rerun all tests when something changes. Useful for TDD
docker-compose run movie npm run dev-test
```

## API

- Enter http://localhost:3000/api-docs in a browser to see the Authentication Swagger API.
- Enter http://localhost:4000/api-docs in a browser to see the Movies Swagger API.

#### Example request `POST /auth`

To authorize user call the auth service using for example `curl`. We assume
that the auth service is running of the default port `3000`.

Request

```
curl --location --request POST '0.0.0.0:3000/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "basic-thomas",
    "password": "sR-_pcoow-27-6PAwCD8"
}'
```

Response

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTYwNjIyMTgzOCwiZXhwIjoxNjA2MjIzNjM4LCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.KjZ3zZM1lZa1SB8U-W65oQApSiC70ePdkQ7LbAhpUQg"
}
```

#### Example request `POST /movies`

To post a movie call the movie service using for example `curl`. We assume
that the movie service is running of the default port `4000`.

Request

```
curl -X 'POST' \
  'http://localhost:4000/api/movies' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTYwNjIyMTgzOCwiZXhwIjoxNjA2MjIzNjM4LCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.KjZ3zZM1lZa1SB8U-W65oQApSiC70ePdkQ7LbAhpUQg' \
  -H 'Content-Type: application/json' \
  -d '{
  "title": "Spiderman"
}'
```

Response

```
{
  "userId": 434,
  "title": "Spiderman",
  "genre": "Short",
  "released": "N/A",
  "director": "Christian Davi",
  "_id": "62355f33f047478b70cf0ef2",
  "createdAt": "2022-03-19T04:42:27.212Z",
  "updatedAt": "2022-03-19T04:42:27.212Z",
  "__v": 0
}
```

##### Example request `GET /movies`

To get movies call the movie service using for example `curl`. We assume
that the movie service is running of the default port `4000`.

Request

```
curl -X 'GET' \
  'http://localhost:4000/api/movies' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTYwNjIyMTgzOCwiZXhwIjoxNjA2MjIzNjM4LCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.KjZ3zZM1lZa1SB8U-W65oQApSiC70ePdkQ7LbAhpUQg'
```

Response

```
[
  {
    "_id": "6234b7a86ec38bee38fcc03d",
    "userId": 434,
    "title": "Spiderman",
    "genre": "Short",
    "released": "N/A",
    "director": "Christian Davi",
    "_id": "62355f33f047478b70cf0ef2",
    "createdAt": "2022-03-19T04:42:27.212Z",
    "updatedAt": "2022-03-19T04:42:27.212Z",
    "__v": 0
  }
]
```

## CI/CD Pipeline

To check CI/CD working

- Click Pull requests Tab - https://github.com/pramishacp/movies-api-microservice/pulls
- Click GitHub Actions Tab - https://github.com/pramishacp/movies-api-microservice/actions
