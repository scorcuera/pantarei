import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export const authRoutes = Router();

authRoutes.route("/login").post(AuthController.login);
authRoutes.route("/register").post(AuthController.register);