<h1 align="center"> Movie Service </h1> <br>

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Testing](#testing)
- [API](#requirements)
- [Screenshots](#screenshots)

## Introduction
### 1) Movie Service 
We'd like you to build a simple Movie API. It should provide two endpoints:
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
1. `GET /movies`
   1. Should fetch a list of all movies created by an authorized user.

⚠️ Don't forget to verify user's authorization token before processing the
request. The token should be passed in request's `Authorization` header.
```
Authorization: Bearer <token>
```

:speaking_head: Movie service code is located under `./movie` directory

### 2) Authorization service
To authorize users please use our simple auth service based on JWT tokens.

:speaking_head: Auth service code is located under `./auth` directory

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
   - Create a **`.env`** file, 
   - Copy **`.env.sample`** content and paste it in the **`.env`**
   - Override **`OMDB_API_KEY`** in **`.env`** with your OMDb API Key
   - (Optional) Default **`APP_PORT`** is **`3000`**. You can override the default value of **`APP_PORT`** by setting the in **`.env`**
   - (Optional) Default **`MONGODB_USER`** is **`root`**.You can override the default value of **`MONGODB_USER`** by setting the in **`.env`**
   - (Optional) Default **`MONGODB_PASSWORD`** is **`123456`**. You can override the default value of **`MONGODB_PASSWORD`** by setting the in **`.env`**
   - (Optional) Default **`MONGODB_DATABASE`** is **`movies`**. You can override the default value of **`MONGODB_DATABASE`** by setting the in **`.env`**
   - (Optional) Default **`MONGODB_DATABASE_TEST`** is **`movies_test`**. You can override the default value of **`MONGODB_DATABASE_TEST`** by setting the in **`.env`**
   - (Optional) Default **`MONGODB_LOCAL_PORT`** is **`7017`**. You can override the default value of **`MONGODB_LOCAL_PORT`** by setting the in **`.env`**
   - (Optional) Default **`NODE_LOCAL_PORT`** is **`4000`**. You can override the default value of **`NODE_LOCAL_PORT`** by setting the in **`.env`**
   - (Optional) Default **`NODE_DOCKER_PORT`** is **`4001`**. You can override the default value by setting the `NODE_DOCKER_PORT` in **`.env`**
3. Run from root dir

### Configure JWT Verification Key

### Run Local

First Build and run your app with Compose in detached mode:
```bash
$ docker-compose up -d
```

When ready, see the status of all the containers:
```bash
$ docker-compose ps
```

:point_right: Optional

When not ready, inspect the logs to find out what errors are occurring:
```bash
$ docker-compose logs --follow
```

When you make any change to the codebase, rebuild and restart the containers:
```bash
$ docker-compose up -d --build
```

To stop and remove containers, networks, images, and volumes:
```bash
$ docker-compose down
```

## Testing

To run integration test:
```bash
$ docker-compose run movie npm run test
```

## API

- Enter http://localhost:3000/api-docs in a browser to see the Authentication Swagger API.
- Enter http://localhost:4000/api-docs in a browser to see the Movies Swagger API.

## Screenshots
TODO: 