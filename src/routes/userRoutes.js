import express from "express";
import cors from "cors";
import { registerNewUser, userLogIn } from "../controller/userController.js";

const corsOptions = {
    origin: "http://localhost:8888",
};

const userRoutes = (app) => {

    app.use(express.json());
    
    app.use(cors(corsOptions));

    app.post("/register", registerNewUser);

    app.post("/login", userLogIn);

};

export default userRoutes;
