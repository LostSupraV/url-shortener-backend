import express from "express";
import urlRouter from "./routes/url.route.js";
import { mode, port } from "./env/env.js";
import { connectDB } from "./config/mongo.config.js";
import cors from "cors";
import errorHandler from "./middlewares/errorHandling.middleware.js";
import { auth } from "./config/auth.config.js";
import { toNodeHandler } from "better-auth/node";
import arcjectMiddleware from "./middlewares/arcjet.middleware.js";
import { requireAuth } from "./middlewares/auth.middleware.js";

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
};

const app = express();

app.use(cors(corsOptions));

// app.use(arcjectMiddleware);

app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/urls", requireAuth, urlRouter);

app.use(errorHandler);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port} in ${mode} mode`);
});