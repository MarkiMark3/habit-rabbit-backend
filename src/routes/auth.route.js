import express from "express";
import { authController } from "../controllers/auth.controller.js";
import { catchError } from "../utils/catchError.js";

export const authRouter = new express.Router();

authRouter.post("/sign-up", catchError(authController.register));

authRouter.get(
  "/activation/:activationToken",
  catchError(authController.activate),
);
authRouter.post("/login", catchError(authController.login));
authRouter.get("/refresh", catchError(authController.refresh));
authRouter.post("/logout", catchError(authController.logout));
authRouter.post("/reset", catchError(authController.reset));
authRouter.post("/resetPassword/:email", catchError(authController.resetPass));
