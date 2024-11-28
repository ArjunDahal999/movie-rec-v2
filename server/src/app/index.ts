import express, { Express } from "express";

import cors from "cors";
import { zodMiddleware } from "../middleware/zod-middleware";
import morgan from "morgan";
import { errorMiddleware } from "../middleware/error-handeler";
import allRouter from "../routes";
import cookieParser from "cookie-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { conntectToDatabase } from "../config/connect-database";
import env from "../utils/validate-ENV";
export const app: Express = express();

// Middleware setup
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
      "https://micro-rec.vercel.app",
    ],
    methods: ["*"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(zodMiddleware);

// Database connection
conntectToDatabase();

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for your application",
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};
const specs = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/api/v1", allRouter);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Server is working just fine" });
});

// Error middleware
app.use(errorMiddleware);
