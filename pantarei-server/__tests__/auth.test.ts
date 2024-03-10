import request from "supertest";
import { Server } from "../models/server.model";
import { prisma } from "../connection/db_client";

beforeAll(async () => {
    await prisma.roles.create({
        data: {
            name: "user",
        }
    })
    await prisma.roles.create({
        data: {
            name: "admin",
            id: 2
        }
    })
})

describe("Register user", () => {
    let newUser = {
        email: "user1@f5.org",
        name: "user1",
        password: "pass1"
    }

    test("should return status code 201 when a user is created", async () => {
        const server = new Server();
        const response = await request(server.app).post("/auth/register").send(newUser);
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("User registered successfully");
    });

    test("should return status code 400 if user already exists", async () => {
        const server = new Server();
        const response = await request(server.app).post("/auth/register").send(newUser);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("User already exists");
    });
})

afterAll(async () => {
    const deleteUsers = prisma.users.deleteMany();
    const deleteRoles = prisma.roles.deleteMany();

    await prisma.$transaction([
        deleteUsers,
        deleteRoles
        ]
    );

    await prisma.$disconnect();
})