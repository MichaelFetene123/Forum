import { Router } from "express";
import { registerUser, loginUser, checkUser } from "../controllers/userController.js";
import { protectRoute } from "../modules/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/checkuser", protectRoute, checkUser);

export default router; 