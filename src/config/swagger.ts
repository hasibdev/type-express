import swaggerJsdoc from 'swagger-jsdoc'
import env from './env'

// Swagger
const options = {
   "definition": {
      "openapi": "3.0.0",
      "info": {
         "title": "Api Documentation",
         "description": 'This is a api Documentation for my application.',
         "version": "1.0.0",
         "contact": {
            "email": "hasib.webdev@gmail.com"
         },
      },
      "servers": [
         { "url": `http://localhost:${env.port}`, "description": "local server" },
         { "url": 'http://example.com', "description": "Production server" },
      ],

   },
   "apis": ["apidocs/*.yaml"], // files containing annotations as above
}

const swaggerSpecs = swaggerJsdoc(options)

export { swaggerSpecs }
