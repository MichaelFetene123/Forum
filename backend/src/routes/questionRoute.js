import { Router } from "express";
import { getAllQuestions } from "./../handlers/questionController.js";

const router = Router();

router.get("/allQuestions",  getAllQuestions);


export default router;
