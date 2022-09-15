import supertest from "supertest";
import { prismaMock } from "./lib/prisma/client.mock";
import app from "./app";
import { prisma } from "@prisma/client";

const request = supertest(app);

test("POST /planets", async () => {
    const planet = {
        name: "Mercury",
        diameter: 123,
        moons: 12,
    };

    const response = await request
        .post("/planets")
        .send(planet)
        .expect(201)
        .expect("Content-type", /application\/json/);

    expect(response.body).toEqual(planet);
});

test("GET /planets", async () => {
    const planets = [
        {
            id: 1,
            name: "Mercury",
            description: null,
            diameter: 123,
            moons: 12,
            createdAt: "2022-09-14T07:36:29.104Z",
            updateAt: "2022-09-14T07:35:27.129Z",
        },
        {
            id: 2,
            name: "Venus",
            description: null,
            diameter: 5678,
            moons: 2,
            createdAt: "2022-09-14T07:36:29.105Z",
            updateAt: "2022-09-14T07:35:59.028Z",
        },
    ];
    // @ts-ignore
    prismaMock.planet.findMany.mockResolvedValue(planets);
    const response = await request
        .get("/planets")
        .expect(200)
        .expect("Content-type", /application\/json/);

    expect(response.body).toEqual(planets);
});
