import { Router } from "express";
import * as productController from "./product.controllers";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post("/create-product", authMiddleware, productController.createProduct);
router.get("/get-products", productController.getProducts);

export default router;
