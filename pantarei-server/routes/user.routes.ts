import Router from "express";
import { UserController } from "../controllers/user.controller";

export const userRoutes = Router();

userRoutes.route("/").get(UserController.getAllUsers);