import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_dev_only";

interface JwtPayload {
  id: number;
  email: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Токен отсутствует или невалиден" });
  }

  const token = authHeader.split(" ")[1]!;

  try {
    const payload = jwt.verify(token, JWT_SECRET) as unknown as JwtPayload;

    req.user = payload;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Сессия истекла или токен поврежден" });
  }
};
