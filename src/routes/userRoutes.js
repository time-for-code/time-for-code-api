import express from "express";
import cors from "cors";
import { getAllUsers, registerNewUser, userLogIn } from "../controller/userController.js";
import { authenticateToken } from "../config/authMiddleware.js";
import { registerExerciseStatistics } from "../controller/statisticController.js";
import { getAllUsersAndRanking, getPerformanceByUserId } from "../controller/perfomanceController.js";

const userRoutes = (app) => {

    app.use(express.json());
    
    app.use(cors());

    /**
     * @swagger
     * /register:
     *   post:
     *     summary: Cadastra um novo usuário
     *     description: Recebe os dados do usuário e registra no sistema.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 example: "João da Silva"
     *               yearOfBirth:
     *                 type: number
     *                 example: 1990
     *               email:
     *                 type: string
     *                 example: "joao@email.com"
     *               password:
     *                 type: string
     *                 example: "123456"
     *     responses:
     *       201:
     *         description: Usuário cadastrado com sucesso
     *       400:
     *         description: Erro no cadastro do usuário
     */
    app.post("/register", registerNewUser);

    /**
     * @swagger
     * /login:
     *   post:
     *     summary: Faz login do usuário
     *     description: Verifica o e-mail e senha e retorna sucesso ou erro.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: "usuario@email.com"
     *               password:
     *                 type: string
     *                 example: "12345678!$"
     *     responses:
     *       202:
     *         description: Login bem-sucedido
     *       401:
     *         description: Credenciais inválidas
    */
    app.post("/login", userLogIn);

    app.get("/users", getAllUsers);

    app.post("/statistics/:user_id", registerExerciseStatistics);

    app.get("/performance/:user_id", getPerformanceByUserId);

    app.get("/ranking/:user_id", getAllUsersAndRanking);

    // TODO app.get("/users/:id", authenticateToken, (req, res) => {

    // app.get("/performance/:id", )
    // app.get("/ranking/:id", );

};

export default userRoutes;
