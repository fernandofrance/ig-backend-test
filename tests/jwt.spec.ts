import { faker } from '@faker-js/faker';
import sequelize from "../src/database/db.config";
import request from "supertest";
import server from "../src/server";

async function signupAndLogin() {
  let data = {
    nome: faker.name.firstName(),
    sobrenome: faker.name.lastName(),
    cpf: faker.finance.account(11),
    email: faker.internet.email(),
    password: faker.internet.password() 
  };
  await request(server).post("/auth/signup").send(data);
  const response = await request(server).post("/auth/login").send({ email: data.email, password: data.password });
  return response.body.token as string;
};

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("JWT middleware", () => {
  it("Should return 401 status code if missing authorization token in request header", async () => {
    const response = await request(server).post("/tasks").send();
    expect(response.statusCode).toEqual(401);
  });

  it("Should return 400 status code if authorization token is invalid", async () => {
    const response = await request(server).post("/tasks").send().set("Authorization", "Bearer invalidtoken123");
    expect(response.statusCode).toEqual(400);
  });

  it("Should return 200 status code if bearer token is valid", async () => {
    const token = await signupAndLogin();
    const response = await request(server).get("/tasks").set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toEqual(200);
  });
});