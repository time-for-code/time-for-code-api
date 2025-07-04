import express from "express";
import cors from "cors";
import {
  getAllUsers,
  registerNewUser,
  userLogIn
} from "../controller/userController.js";
import {
  registerExerciseStatistics
} from "../controller/statisticController.js";
import {
  getAllUsersAndRanking,
  getPerformanceByUserId
} from "../controller/perfomanceController.js";

const router = express.Router();

// middlewares
router.use(cors());
router.use(express.json());

// rotas
router.post("/register", registerNewUser);
router.post("/login", userLogIn);
router.get("/users", getAllUsers);
router.post("/statistics/:user_id", registerExerciseStatistics);
router.get("/performance/:user_id", getPerformanceByUserId);
router.get("/ranking/:user_id", getAllUsersAndRanking);

export default router;