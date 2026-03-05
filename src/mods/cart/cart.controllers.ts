import type { Response } from "express";
import { prisma } from "../../prisma";
import type { AuthRequest } from "../../middleware/auth.middleware";

const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingCartItem = await prisma.cart.findFirst({
      where: {
        userId: userId,
        productId: product.id,
      },
    });

    if (existingCartItem) {
      return res.status(400).json({
        message: "Product already exists in cart",
      });
    }

    const cartItem = await prisma.cart.create({
      data: {
        productId: product.id,
        userId: userId,
        totalPrice: product.price,
      },
      include: {
        product: true,
      },
    });

    return res.status(201).json({
      message: "Product added to cart successfully",
      cartItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const cartItems = await prisma.cart.findMany({
      where: { userId: userId },
      include: {
        product: true,
      },
    });

    return res.status(200).json({
      message: "Cart items retrieved successfully",
      cartItems,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { addToCart, getCart };
