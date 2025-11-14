"use strict";

import express from "express";
import "dotenv/config";
import { authRouter } from "./routes/auth.route.js";
import { habitsRounter } from "./routes/habits.router.js";
import cors from "cors";
import { userRouter } from "./routes/user.router.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import { todosRounter } from "./routes/todo.route.js";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  }),
);

app.options(
  "*",
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

app.use(express.json());

app.use(authRouter);
app.use(habitsRounter);
app.use(todosRounter);
app.use("/users", userRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
