import { Request, Response } from "express";
import { User } from "../models/user.model";
import { hashPassword, verifyPassword } from "../utils/password.utils";
import { createToken } from "../utils/jwt.utils";
import { UserRegisterSchema } from "../schemas/user.schema";
import { ZodError } from "zod";

export const AuthController = {
    login: async (req: Request, res: Response) => {
        try {

            let userDataFromClient = req.body;

            let userInfo = await User.getUserByEmail(userDataFromClient.email);

            if (!userInfo) {
                return res.status(400).json({ message: "User does not exist" });
            }

            let encryptedPassword = userInfo?.password as string;
            let isPasswordValid = await verifyPassword(userDataFromClient.password, encryptedPassword);

            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid password" });
            }

            let userId = userInfo?.id as string;
            let token = createToken(userId);

            const data = {
                token: token,
                user: {
                    id: userInfo?.id,
                    name: userInfo?.name,
                    email: userInfo?.email,
                    role_id: userInfo?.role_id
                }
            }

            res.status(200).json({ message: "User logged in", data: data});

        } catch (error) {
            res.status(500).json({ message: "An error occurred while logging in" });
        }
    },
    register: async (req: Request, res: Response) => {
        try {
            let userDataFromClient = UserRegisterSchema.parse(req.body);

            let isRegistered = await User.getUserByEmail(userDataFromClient.email);

            if (isRegistered) {
                return res.status(400).json({ message: "User already exists" });
            }

            let userPassword = userDataFromClient.password;
            let encryptedPassword = await hashPassword(userPassword);

            let userData = {...userDataFromClient, password: encryptedPassword};

            await User.createUser(userData);

            res.status(201).json({ message: "User registered successfully" });

        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.issues[0].message });
            }
            res.status(500).json({ message: "An error occurred while registering" });
        }
    }
};