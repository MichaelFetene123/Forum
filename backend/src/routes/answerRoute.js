import { Router } from "express";
import { createAnswer, getAnswers } from "../controllers/answerController.js";

const router = Router();

router.post('/answer', createAnswer)
router.get("/answer/:question_id", getAnswers);
export default router;
