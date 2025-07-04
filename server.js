import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import swaggerDocs from "./src/config/swaggerConfig.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(express.json());
app.use(cors());

// Rota simples para confirmar funcionamento
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// Swagger
swaggerDocs(app);

// Rotas principais (sem prefixo /api)
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor está sendo executado na porta ${PORT}`);
});
