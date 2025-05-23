import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { authRouter } from "routes/auth.routes";
import { contraRoute } from "routes/cambioContra.routes";
import { errorHandler } from "middlewares/errorHandler";
export const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3150",
      "http://localhost:3000",
      "http://localhost:4000",
    ],
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/user", authRouter);
app.use(contraRoute);

app.use(errorHandler);
