import { config } from "dotenv";
config(); 

import { buildServer } from "./app";

const server = buildServer();

const start = async () => {
  try {
    const PORT = Number(process.env.PORT) || 5003;

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Ошибка при запуске:", err);
    process.exit(1);
  }
};

start();