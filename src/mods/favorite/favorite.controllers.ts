import type { Response } from "express";
import type { AuthRequest } from "../../middleware/auth.middleware";
import { prisma } from "../../prisma";

const addToFavorite = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { productId } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId,
        productId: Number(productId),
      },
    });

    if (existingFavorite) {
      return res.status(400).json({ message: "Product already in favorites" });
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId,
        productId: Number(productId),
      },
    });

    return res
      .status(200)
      .json({ message: "Product added to favorites", favorite });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { addToFavorite };
