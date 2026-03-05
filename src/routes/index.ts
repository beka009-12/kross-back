import cors from "cors";
import { Router } from "express";
import userRouter from "../mods/user/user.routes";
import authRouts from "../mods/auth/auth.routes";
import cartRouter from "../mods/cart/cart.routes";
import productRouter from "../mods/product/product.routes";

const configCors = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

const router = Router();

router.use("/auth", cors(configCors), authRouts);
router.use("/user", cors(configCors), userRouter);
router.use("/product", cors(configCors), productRouter);
router.use("/cart", cors(configCors), cartRouter);

export default router;
