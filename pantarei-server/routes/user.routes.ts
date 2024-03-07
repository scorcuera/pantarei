import Router from "express";
import { UserController } from "../controllers/user.controller";
import { isAdmin } from "../middlewares/session.middleware";

export const userRoutes = Router();

userRoutes.route("/").get(isAdmin, UserController.getAllUsers);