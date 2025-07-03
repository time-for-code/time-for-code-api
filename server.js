import express from "express";
import routes from "./src/routes/userRoutes.js";
import swaggerDocs from "./src/config/swaggerConfig.js";

const app = express();
const PORT = process.env.PORT || 3000;

swaggerDocs(app);
routes(app);

app.listen(PORT, '0.0.0.0', () => {
    // console.log(`Servidor está sendo executado na porta ${PORT} :)`);
});