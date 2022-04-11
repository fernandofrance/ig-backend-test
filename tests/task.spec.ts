import { faker } from '@faker-js/faker';
import sequelize from "../src/database/db.config";
import request from "supertest";
import server from "../src/server";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Create tasks", () => {
  let data = {
    nome: faker.name.firstName(),
    sobrenome: faker.name.lastName(),
    cpf: faker.finance.account(11),
    email: faker.internet.email(),
    password: faker.internet.password() 
  };

  it("Should return 400 status code if any request body fields are missing", async () => {
    await request(server).post("/auth/signup").send(data);
    const login = await request(server).post("/auth/login").send({ email: data.email, password: data.password });
    const token = login.body.token;

    const response = await request(server).post("/tasks").set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toEqual(400)
  });

  it("Should return 201 status code if everything is ok", async () => {
    await request(server).post("/auth/signup").send(data);
    const login = await request(server).post("/auth/login").send({ email: data.email, password: data.password });
    const token = login.body.token;

    const response = await request(server)
    .post("/tasks")
    .set("Content-type", "application/json")
    .set("Authorization", `Bearer ${token}`)
    .send({ title: "Dar ração pro gato", done: true, date: "04/14/2022" })
    expect(response.statusCode).toEqual(201)
  });
});

describe("Get tasks", () => {
  let data = {
    nome: faker.name.firstName(),
    sobrenome: faker.name.lastName(),
    cpf: faker.finance.account(11),
    email: faker.internet.email(),
    password: faker.internet.password() 
  };

  it("Should return 404 status code if task id not found in /tasks/:id route", async () => {
    await request(server).post("/auth/signup").send(data);
    const login = await request(server).post("/auth/login").send({ email: data.email, password: data.password });
    const token = login.body.token;

    const response = await request(server).get("/tasks/123abc").set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toEqual(404);
  });
});