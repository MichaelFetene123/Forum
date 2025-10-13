import { Router } from "express";
import { createAnswer } from "../controllers/answerController.js";

const router = Router();

router.post('/answer', createAnswer)
export default router;
