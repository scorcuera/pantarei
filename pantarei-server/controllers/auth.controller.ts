import { Request, Response } from "express";
import { User } from "../models/user.model";
import { hashPassword } from "../utils/password.utils";

export const AuthController = {
    login: (req: Request, res: Response) => {
        try {
            // capturar los datos del usuario que vienen en el body
            let userDataFromClient = req.body;
            console.log(userDataFromClient);

            // validar que los datos del usuario sean correctos

            // comprobar que el usuario exista en la base de datos

            // comprobar que la contraseña sea correcta

            // generar un token de autenticación

            // enviar el token al cliente



        } catch (error) {
            res.status(500).json({ message: "An error occurred while logging in" });
        }
    },
    register: async (req: Request, res: Response) => {
        try {
            let userDataFromClient = req.body;

            // validar que los datos del usuario sean correctos [pendiente]

            let isRegistered = await User.getUserByEmail(userDataFromClient.email);

            if (isRegistered) {
                res.status(400).json({ message: "User already exists" });
            }

            let userPassword = userDataFromClient.password;
            let encryptedPassword = await hashPassword(userPassword);

            let userData = {...userDataFromClient, password: encryptedPassword};

            await User.createUser(userData)

            res.status(201).json({ message: "User registered successfully" });

        } catch (error) {
            res.status(500).json({ message: "An error occurred while registering" });
        }
    }
};