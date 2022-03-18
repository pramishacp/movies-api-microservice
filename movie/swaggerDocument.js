require("dotenv").config();

const swaggerDocument = {
  swagger: "2.0",
  info: {
    description: "Movie Service Documentation",
    version: "1.0.6",
    title: "Movie",
  },
  host: `localhost:${process.env.NODE_LOCAL_PORT}`,
  basePath: "/api",
  tags: [
    {
      name: "movies",
      description: "Movies",
    },
  ],
  schemes: ["http"],
  paths: {
    "/movies": {
      post: {
        tags: ["movies"],
        summary: "Creates a movie",
        description: "Allows creating a movie object based on movie title passed in the request body",
        operationId: "insertMovie",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            "name": "x-auth-token",
            "in": "header",
            "required": true,
            "type": "string"
          },
          {
            in: "body",
            name: "body",
            description: "Movie object with title to fetch additional movie details from omdb and save to the database",
            required: true,
            schema: {
              $ref: "#/definitions/Movie",
            },
          },
        ],
        responses: {
          200: {
            description: "successful operation",
            schema: {
              $ref: "#/definitions/ApiResponse",
            },
          },
          "400": {
            "description": "Invalid token. | Invalid payload. | Movie not found."
          },
          "401": {
            "description": "Access denied. No token provided." 
          },
          "403": {
            "description": "Basic user can only create 5 movies a month. Please upgrade to premium." 
          },
          "500": {
            "description": "Something failed." 
          }
        },
      },
      get: {
        tags: ["movies"],
        summary: "Returns movies",
        description: "Returns list of all movies created by an authorized user",
        operationId: "findAllByUserId",
        produces: ["application/json"],
        parameters: [
          {
            "name": "x-auth-token",
            "in": "header",
            "required": true,
            "type": "string"
          },
        ],
        responses: {
          200: {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                "$ref": "#/definitions/ApiResponse"
              }
            },
          },
          "400": {
            "description": "Invalid token."
          },
          "401": {
            "description": "Access denied. No token provided." 
          },
          "500": {
            "description": "Something failed." 
          }
        }
      },
    }
  },
  definitions: {
    ApiResponse: {
      type: "object",
      properties: {
        userId: {
          type: "number",
        },
        title: {
          type: "string",
        },
        genre: {
          type: "string",
        },
        released: {
          type: "string",
        },
        director: {
          type: "string",
        },
        _id: {
          type: "string",
        },
      },
    },
    Movie: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Title of the movie",
          enum: ["Spiderman", "Batman"],
        },
      },
    },
  },
  externalDocs: {
    description: "Go to Auth Documentation",
    url: `${process.env.AUTH_URL}/api-docs`,
  },
};

module.exports.swaggerDocument = swaggerDocument;
