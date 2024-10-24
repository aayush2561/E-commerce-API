import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API for User and Order Management',
        },
        servers: [
            {
                url: process.env.API_URL, 
                description: 'Development server',
            },
        ],
    },
    apis: ['./routes/*.js'], 
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);

