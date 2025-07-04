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
router.post("/api/register", registerNewUser);
router.post("/qpi/login", userLogIn);
router.get("/api/users", getAllUsers);
router.post("/api/statistics/:user_id", registerExerciseStatistics);
router.get("/api/performance/:user_id", getPerformanceByUserId);
router.get("/api/ranking/:user_id", getAllUsersAndRanking);

export default router;