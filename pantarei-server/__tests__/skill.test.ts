import request from "supertest";
import { Server } from "../models/server.model";
import { prisma } from "../connection/db_client";

let newSkillId = "";
let newSkill = {
    name: "test1",
    description: "test1"
}

beforeAll(() => {
    prisma.skills.create({
        data: newSkill
    }).then(skill => {
        newSkillId = skill.id;
    });
})

describe("GET skills", () => {
    test("should return status code 200 when skills are called", async () => {
        const server = new Server();
        const response = await request(server.app).get("/skills");
        expect(response.status).toBe(200);
    });
    test("should return status code 200 if requested skill exists", async () => {
        const server = new Server();
        const response = await request(server.app).get(`/skills/${newSkillId}`);
        expect(response.status).toBe(200);
    })
    test("should return status code 404 if requested skill does not exist", async () => {
        const server = new Server();
        const response = await request(server.app).get("/skills/pepito");
        expect(response.status).toBe(404);
    });
})

describe("POST skill", () => {
    let newSkillId = "";
    let newSkill = {
        name: "test2",
        description: "test2"
    }
    test("should return status code 201 when a skill is created", async () => {
        const server = new Server();
        const response = await request(server.app).post("/skills").send(newSkill);
        expect(response.status).toBe(201);
        newSkillId = response.body.skill.id;
    });
    test("should return the created skill", async () => {
        const server = new Server();
        const response = await request(server.app).get(`/skills/${newSkillId}`);
        expect(response.body.name).toBe(newSkill.name);
    });
});

afterAll(async () => {
    const deleteSkills = prisma.skills.deleteMany();

    await prisma.$transaction([
        deleteSkills
    ])

    await prisma.$disconnect();
});
