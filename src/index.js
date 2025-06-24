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

const PORT = process.env.PORT || 3001;
const app = express();
const allowedOrigins = ["https://habit-rabbit-frontend.vercel.app"];

app.use(cookieParser());

// app.use(
//   cors({
//     origin: "https://habit-rabbit-frontend.vercel.app",
//     credentials: true,
//   }),
// );

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.options("*", cors());
app.use(express.json());

app.use(authRouter);
app.use(habitsRounter);
app.use(todosRounter);
app.use("/users", userRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
