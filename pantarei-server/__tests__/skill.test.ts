import request from "supertest";
import { Server } from "../models/server.model";
import { prisma } from "../connection/db_client";

console.log(process.env.DATABASE_URL);

describe("GET skills", () => {
    test("should return status code 200 when skills are called", async () => {
        const server = new Server();
        const response = await request(server.app).get("/skills");
        expect(response.status).toBe(200);
    })
})

describe("POST skill", () => {
    const newSkill = {
        id: "3f129146-d4bc-11ee-a6c4-eb26fc7f8620",
        name: "test1",
        description: "test1"
    }
    test("should return status code 201 when a skill is created", async () => {
        const server = new Server();
        const response = await request(server.app).post("/skills").send(newSkill);
        expect(response.status).toBe(201);
    })
})