require("dotenv").config();

const swaggerDocument = {
  "swagger": "2.0",
  "info": {
    "description": "Authentication Service Documentation",
    "version": "1.0.6",
    "title": "Authentication",
  },
  "host": `localhost:${process.env.APP_PORT}`,
  "basePath": "/",
  "tags": [
    {
      "name": "auth",
      "description": "Authentication"
    }
  ],
  "schemes": ["http"],
  "paths": {
    "/auth": {
      "post": {
        "tags": ["auth"],
        "summary": "Logs user into the system",
        "description": "",
        "operationId": "auth",
        "consumes": ["application/json"],
        "produces": ["application/json"],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "User login details",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Auth"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "$ref": "#/definitions/ApiResponse"
            }
          },
          "400": {
            "description": "invalid payload"
          },
          "401": {
            "description": "invalid username or password" 
          },
          "500": {
            "description": "internal server error" 
          },
        }
      }
    }
  },
  "definitions": {
    "ApiResponse": {
      "type": "object",
      "properties": {
        "token": {
          "type": "string"
        }
      }
    },
    "Auth": {
      "type": "object",
      "properties": {
        "username": {
          "type": "string",
          "description": "User's username",
          "enum": ["basic-thomas", "premium-jim"]
        },
        "password": {
                "type": "string",
                "description": "User's password",
                "enum": ["sR-_pcoow-27-6PAwCD8", "GBLtTyq3E_UNjFnpo9m6"]
        }
      }
    }
  }
}

module.exports.swaggerDocument = swaggerDocument