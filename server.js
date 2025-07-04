import express from "express";
import userRoutes from "./src/routes/userRoutes.js";
import swaggerDocs from "./src/config/swaggerConfig.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global
app.use(express.json());
app.use(cors());

// Rota raiz de teste
app.get("/", (req, res) => {
  res.send("API está rodando");
});

// Swagger
swaggerDocs(app);

// Use rotas com prefixo /api
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor está sendo executado na porta ${PORT}`);
});