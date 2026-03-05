import cors from "cors";
import express from "express";
import routes from "./routes/index";

export const buildServer = () => {
  const server = express();

  server.use(cors());
  server.use(express.json());

  // Главный роут для проверки
  server.get("/", (req, res) => {
    res.status(200).send({
      message: "Kross Back API is running",
      description: "Sample app with Express, TypeScript, Prisma & JWT",
    });
  });

  server.use("/api", routes);

  return server;
};
