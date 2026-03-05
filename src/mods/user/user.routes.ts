import { Router } from "express";
import * as userController from "./user.controllers";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, userController.getUser);

export default router;
