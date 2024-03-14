import request from "supertest";
import { Server } from "../models/server.model";
import { prisma } from "../connection/db_client";

beforeAll(async () => {
    let newAdmin = {
        email: "admin@f5.org",
        name: "admin",
        password: "pass2",
        role_id: 2
    };
    let newUser = {
        email: "user@f5.org",
        name: "user",
        password: "pass1",
        role_id: 1
    }
    const server = new Server();
    await request(server.app).post("/auth/register").send(newAdmin);
    await request(server.app).post("/auth/register").send(newUser);
})

describe("GET users", () => {
    let token = "";
    beforeAll(async () => {
        let admin = {
            email: "admin@f5.org",
            password: "pass2"
        }
        const server = new Server();
        let response = await request(server.app).post("/auth/login").send(admin);
        token = response.body.data.token;
    });
    test("should return status code 200 when users are called", async () => {
        const server = new Server();
        const response = await request(server.app).get("/users").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    test("should return status code 401 if not token or not valid token is provided", async () => {
        const server = new Server();
        const response = await request(server.app).get("/users");
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Not valid token");
    });
    test("should return 401 if user is not admin", async () => {
        let user = {
            email: "user@f5.org",
            password: "pass1"
        }
        const server = new Server();
        await request(server.app).post("/auth/login").send(user).then(response => {
            token = response.body.data.token;
        });
        let response = await request(server.app).get("/users").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Not valid permissions");
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