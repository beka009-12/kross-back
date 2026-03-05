import type { Request, Response } from "express";
import type { AuthRequest } from "../../middleware/auth.middleware";
import { prisma } from "../../prisma";

const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { title, image, price } = req.body;

    if (!title || !image || price === undefined) {
      return res
        .status(400)
        .json({ message: "Все поля (title, image, price) обязательны" });
    }

    const product = await prisma.product.create({
      data: {
        title,
        image,
        price: Number(price),
      },
    });

    return res.status(201).json({
      message: "Продукт успешно создан",
      product,
    });
  } catch (error: any) {
    console.error("Create Product Error:", error.message);

    return res.status(500).json({
      message: "Внутренняя ошибка сервера",
      error: error.message,
    });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();

    if (!products) {
      return res.status(404).json({ message: "Продукты не найдены" });
    }

    return res.status(200).json({
      message: "Продукты успешно получены",
      products,
    });
  } catch (error: any) {
    console.error("Get Products Error:", error.message);

    return res.status(500).json({
      message: "Внутренняя ошибка сервера",
      error: error.message,
    });
  }
};

export { createProduct, getProducts };
