const request = require("supertest");
const app = require("../src/app");

describe("API TaskApp", () => {

    test("GET /health debe devolver OK", async () => {
        const response = await request(app)
            .get("/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("OK");
    });

    test("POST /api/tasks debe crear una tarea", async () => {
        const response = await request(app)
            .post("/api/tasks")
            .send({
                title: "Aprender DevOps"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe("Aprender DevOps");
    });

    test("GET /api/tasks debe devolver las tareas", async () => {
        const response = await request(app)
            .get("/api/tasks");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

});