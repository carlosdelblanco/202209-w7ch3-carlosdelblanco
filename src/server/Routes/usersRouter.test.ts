import request from "supertest";
import app from "../app";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import databaseConnection from "../../database/databaseConnection";
import User from "../../database/models/User";
import bcrypt from "bcryptjs";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await databaseConnection(server.getUri());
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given a POST /users/register endpoint", () => {
  const newUser = {
    username: "user4",
    password: "123456",
    email: "user4@user.com",
  };
  describe("When it receives a request with the name 'user4' and password '123456' and email 'user4@user.com'", () => {
    test("Then it should respond with a 201 status and the new user 'user4'", async () => {
      const expectedStatus = 201;

      const response = await request(app)
        .post("/users/register")
        .send(newUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("user");
    });
  });

  describe("When it receives a user that exists with the name 'user4' and password '123456' and email 'user4@user.com", () => {
    test("Then it should respond with a 500 status 'General Pete'", async () => {
      await User.create(newUser);

      const expectedStatus = 500;

      const expectedErrorMessage = "General Pete";

      const response = await request(app)
        .post("/users/register")
        .send(newUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("error", expectedErrorMessage);
    });
  });
});

describe("Given a Post /users/login endpoint", () => {
  const loginUser = {
    username: "user5",
    password: "654321",
    email: "user5@gmail.com",
  };
  describe("When it receives  request with a username 'user5' and password '654321' with email 'user5@gmail.com'", () => {
    test("Then it should return a status code 200 and the token property", async () => {
      const expectedStatus = 200;

      const hashedPassword = await bcrypt.hash(loginUser.password, 10);

      await User.create({
        username: loginUser.username,
        password: hashedPassword,
        email: loginUser.email,
      });

      const response = await request(app)
        .post("/users/login")
        .send(loginUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("token");
    });

    describe("And the username is incorrect", () => {
      test("Then it should respond with a status 401 'Invalid credentials'", async () => {
        const expectedStatus = 401;

        const expectedErrorMessage = "Invalid credentials";

        const hashedPassword = await bcrypt.hash(loginUser.password, 10);

        await User.create({
          username: loginUser.username,
          password: hashedPassword,
          email: loginUser.email,
        });

        const loginUserInvalid = {
          username: "user6",
          password: "654321",
          email: "user5@gmail.com",
        };

        const response = await request(app)
          .post("/users/login")
          .send(loginUserInvalid)
          .expect(expectedStatus);

        expect(response.body).toHaveProperty("error", expectedErrorMessage);
      });
    });

    describe("And the password is incorrect", () => {
      test("Then it should respond with a status 401 and 'Invalid credentials'", async () => {
        const expectedStatus = 401;

        const expectedErrorMessage = "Invalid credentials";

        const hashedPassword = await bcrypt.hash(loginUser.password, 10);

        await User.create({
          username: loginUser.username,
          password: hashedPassword,
          email: loginUser.email,
        });

        const loginUserInvalid = {
          username: "user5",
          password: "654322",
          email: "user5@gmail.com",
        };

        const response = await request(app)
          .post("/users/login")
          .send(loginUserInvalid)
          .expect(expectedStatus);

        expect(response.body).toHaveProperty("error", expectedErrorMessage);
      });
    });
  });
});
