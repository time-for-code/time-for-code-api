import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import swaggerDocs from "./src/config/swaggerConfig.js";

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares globais
app.use(express.json());
app.use(cors());

// rota de saúde
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// 1) acontece antes do Swagger
app.use("/", userRoutes);

// 2) só depois registramos o Swagger
swaggerDocs(app);

app.listen(PORT, () =>
  console.log(`Servidor rodando na porta ${PORT}`)
);
