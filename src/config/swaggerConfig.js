import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Usuários",
            version: "1.0.0",
            description: "Documentação da API de Usuários usando Swagger",
        },
        servers: [
            {
                url:  process.env.RENDER_EXTERNAL_URL || "http://localhost:3000",
                description: "Servidor",
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("Swagger rodando em: /api-docs");
};

export default swaggerDocs;