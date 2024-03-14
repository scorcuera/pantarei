import request from "supertest";
import { Server } from "../models/server.model";
import { prisma } from "../connection/db_client";

beforeAll(async () => {
    await prisma.roles.create({
        data: {
            name: "user",
            id: 1
        }
    });
    await prisma.roles.create({
        data: {
            name: "admin",
            id: 2
        }
    });
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
});

describe("Login user", () => {
    let user = {
        email: "user1@f5.org",
        password: "pass1"
    }

    test("should return status code 200 when user logs in", async () => {
        const server = new Server();
        const response = await request(server.app).post("/auth/login").send(user);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User logged in");
    });

    test("should return status code 400 if user does not exist", async () => {
        const server = new Server();
        const response = await request(server.app).post("/auth/login").send({...user, email: "pepito@f5.org"})
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("User does not exist");
    });
    
    test("should return status code 400 if password is invalid", async () => {
        const server = new Server();
        const response = await request(server.app).post("/auth/login").send({...user, password: "pepito"})
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid password");
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