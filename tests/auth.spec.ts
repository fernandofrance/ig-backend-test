import { faker } from '@faker-js/faker';
import sequelize from "../src/database/db.config";
import request from "supertest";
import server from "../src/server";

beforeAll(async () => {
  await sequelize.sync({ force: true });
})

afterAll(async () => {
  await sequelize.close();
});

describe("Sign Up route", () => {
  it("Should return 400 status code if missing request body", async () => {
    const response = await request(server).post("/auth/signup").send();
    expect(response.statusCode).toEqual(400);
  });

  it("Should return 400 status code if email or CPF is already registered", async () => {
    let data = {
      nome: faker.name.firstName(),
      sobrenome: faker.name.lastName(),
      cpf: faker.finance.account(11),
      email: faker.internet.email(),
      password: faker.internet.password() 
    };
    await request(server).post("/auth/signup").send(data);

    const response = await request(server).post("/auth/signup").send(data);
    expect(response.statusCode).toEqual(400);
  });

  it("Should return 201 status code if all validations pass", async () => {
    let data = {
      nome: faker.name.firstName(),
      sobrenome: faker.name.lastName(),
      cpf: faker.finance.account(11),
      email: faker.internet.email(),
      password: faker.internet.password() 
    };

    const response = await request(server).post("/auth/signup").send(data);
    expect(response.statusCode).toEqual(201);
  });
});

describe("Login route", () => {
  it("Should return 404 status code if email is not found", async () => {
    let data = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const response = await request(server).post("/auth/login").send(data);
    expect(response.statusCode).toEqual(404);
  });

  it("Should return 403 status code if password is incorrect", async () => {
    let data = {
      nome: faker.name.firstName(),
      sobrenome: faker.name.lastName(),
      cpf: faker.finance.account(11),
      email: faker.internet.email(),
      password: faker.internet.password() 
    };
    await request(server).post("/auth/signup").send(data);

    const response = await request(server).post("/auth/login").send({
      "email": data.email,
      "password": "SenhaErrada"
    });
    expect(response.statusCode).toEqual(401);
  });

  it("Should return the JWT token if password match", async () => {
    let data = {
      nome: faker.name.firstName(),
      sobrenome: faker.name.lastName(),
      cpf: faker.finance.account(11),
      email: faker.internet.email(),
      password: faker.internet.password() 
    };
    await request(server).post("/auth/signup").send(data);

    const response = await request(server).post("/auth/login").send({
      "email": data.email,
      "password": data.password
    });
    expect(response.body).toHaveProperty("token");
  });
});

