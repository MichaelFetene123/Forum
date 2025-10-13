import { Router } from "express";
import {
  getAllQuestions,
  createQuestion,
} from "../controllers/questionController.js";

const router = Router();

router.get("/allQuestions", getAllQuestions);
router.post("/question", createQuestion);

export default router;
