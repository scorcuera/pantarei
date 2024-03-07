import { prisma } from "../connection/db_client";
import { UserRegisterData } from "../interfaces/user.interface";

export const User = {
    getAllUsers: async () => {
        try {
            const users = await prisma.users.findMany();
            return users;
        } catch (error) {
            throw new Error("An error occurred while fetching users");
        }
    },
    getUserById: async (id: string) => {
        try {
            const user = await prisma.users.findUnique({
                where: {
                    id: id
                }
            });
            return user;
        } catch (error) {
            throw new Error("An error occurred while fetching user");
        }
    },
    getUserByEmail: async (email: string) => {
        try {
            const user = await prisma.users.findUnique({
                where: {
                    email: email
                }
            });
            return user;
        } catch (error) {
            throw new Error("An error occurred while fetching user");
        }
    },
    createUser: async (data: UserRegisterData) => {
        try {
            const user = await prisma.users.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    role_id: data.role_id || 1
                }
            });
            return user;
        } catch (error) {
            throw new Error("An error occurred while creating user");
        }
    }
}