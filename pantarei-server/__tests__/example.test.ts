import request from "supertest";
import { Server } from "../models/server.model";
import { prisma } from "../connection/db_client";

let newSkillId = "";
let newSkill = {
    name: "test1",
    description: "test1"
};

beforeAll(() => {
    prisma.skills.create({
        data: newSkill
    }).then(skill => {
        newSkillId = skill.id;
    });
})

describe("GET skills", () => {
    test("should return status code 200 when skills has ben called", async () => {
        const server = new Server();
        const response = await request(server.app).get("/skills");
        expect(response.status).toBe(200);
    });
    
    test("should return status code 404 when route does not exist", async () =>{
        const server = new Server();
        const response = await request(server.app).get("/pepito");
        expect(response.status).toBe(404);
    })
    test("should return status code 200 when one single skill has been called", async () => {
        const server = new Server();
        const response = await request(server.app).get(`/skills/${newSkillId}`);
        expect(response.status).toBe(200);
    })
    test("should return status code 404 when one single skill has been called and it does not exist", async () => {
        const server = new Server();
        const response = await request(server.app).get("/skills/1232");
        expect(response.status).toBe(404);
    })
})

describe("POST skill", () => {
    // me tiene que devolver un status code xxx cuando cree una skill
    const newSkillMalformed = {
        name: "",
        description: "test2"
    }
    const newSkill = {
        name: "test2",
        description: "test2"
    }
    test("should return status code 201 when one skill has been created", async() => {
        const server = new Server();
        const response = await request(server.app).post("/skills").send(newSkill);
        expect(response.status).toBe(201);
    });

    test("should return status code 400 when name is malformed", async() => {
        const server = new Server();
        const response = await request(server.app).post("/skills").send(newSkillMalformed);
        expect(response.status).toBe(400);
    });
})


