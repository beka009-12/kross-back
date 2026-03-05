import { Router } from "express";
import * as cartItems from "./cart.controllers";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post("/add-to-cart", authMiddleware, cartItems.addToCart);
router.get("/get-cart", authMiddleware, cartItems.getCart);

export default router;
