const swaggerAutogen = require('swagger-autogen');

const outputFile = './swagger/swagger_output.json';
const endpointsFiles = ['./app.js'];

const doc = {
    info: {
        version: '1.0.0',
        title: 'Bravo Challenge',
        description: 'Documentation automatically generated by the <b>swagger-autogen</b> module.',
    },
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: 'Currencies',
            description: 'Endpoints',
        },
    ],

};

swaggerAutogen()(outputFile, endpointsFiles, doc);