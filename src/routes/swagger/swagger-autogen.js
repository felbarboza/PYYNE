const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['../index.ts'];

swaggerAutogen(outputFile, endpointsFiles);
