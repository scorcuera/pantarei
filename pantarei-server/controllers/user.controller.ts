import { Request, Response } from "express";
import { User } from "../models/user.model";

export const UserController = {
    getAllUsers: async (req: Request, res: Response) => {
        try {
            const users = await User.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "An error occurred while fetching users" });
        }
    }
};