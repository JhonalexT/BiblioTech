import express from "express";
import cors from "cors";
import "dotenv/config";

import { dbConnection } from "./database/config.js";
import { logger } from "./middlewares/logger.js";
import { notFound, errorHandler } from "./middlewares/errores.js";

import authRoutes from "./routes/authRoutes.js";
import authorsRoutes from "./routes/authorsRoutes.js";
import booksRoutes from "./routes/booksRoutes.js";
import loansRoutes from "./routes/loansRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.middlewares();
    this.routes();
    this.errores();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(logger);
  }

  routes() {
    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/authors", authorsRoutes);
    this.app.use("/api/books", booksRoutes);
    this.app.use("/api/loans", loansRoutes);
    this.app.use("/api/users", usersRoutes);
  }

  // Siempre al final: ruta inexistente (404) y errores inesperados (500)
  errores() {
    this.app.use(notFound);
    this.app.use(errorHandler);
  }

  async connectionDB() {
    await dbConnection();
  }

  // Primero conecta a la base de datos y solo después escucha el puerto
  async listen() {
    try {
      await this.connectionDB();
      this.app.listen(this.port, () => {
        console.log(`Servidor escuchando en el puerto ${this.port}`);
      });
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
}
