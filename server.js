import express from "express";
import cors from "cors"; // ✅ Importação correta
import userRoutes from "./src/routes/userRoutes.js";
import swaggerDocs from "./src/config/swaggerConfig.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(express.json());
app.use(cors()); // ✅ Middleware de CORS ativado

// Rota de teste (evita erro 404 na raiz)
app.get("/", (req, res) => {
  res.send("API está rodando! 🚀");
});

// Swagger
swaggerDocs(app);

// Rotas com prefixo /api
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor está sendo executado na porta ${PORT}`);
});
