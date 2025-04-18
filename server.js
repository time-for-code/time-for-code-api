import express from "express";
import routes from "./src/routes/userRoutes.js";
import swaggerDocs from "./src/config/swaggerConfig.js";

const app = express();

swaggerDocs(app);

routes(app);

app.listen(3000, () => {
    console.log('Servidor está sendo executado na porta 3000 :)');
});