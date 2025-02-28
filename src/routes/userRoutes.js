import express from "express";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8080",
    optionSuccessStatus: 200
};

const routes = (app) => {

    app.use(express.json())
    
    app.use(cors(corsOptions))

    app.get("/",)

}