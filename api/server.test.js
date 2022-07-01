const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

const userA = { username: "foo", password: "bar", id: 1 };
const userB = { username: "foo", password: "baluga", id: 1 };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

test("sanity", () => {
  expect(true).toBe(true);
});

it("sanity check jokes", () => {
  expect(true).not.toBe(false);
});

// describe("/register endpoint", () => {
//   beforeEach(async () => {
//     await db("users").truncate();
//   });
//   it("Registers", async () => {
//     const response = await request(server)
//       .post("/api/auth/register")
//       .send(user);
//     expect(response.body).toHaveProperty("id");
//     expect(response.body).toHaveProperty("username");
//     expect(response.body).toHaveProperty("password");
//   });
//   it("Fails with a missing password", async () => {
//     const response = await request(server)
//       .post("/api/auth/register")
//       .send(noPassword);
//     expect(response.body).toBe("username and password required");
//   });
// });

// describe("/login endpoint", () => {
//   beforeEach(async () => {
//     await db("users").truncate();
//   });
//   it("Logs in with registered user", async () => {
//     await request(server).post("/api/auth/register").send(user);
//     const response = await request(server).post("/api/auth/login").send(userA);
//     expect(response.body).toHaveProperty("message");
//     expect(response.body).toHaveProperty("token");
//   });
//   it("Will not log in an unregistered user", async () => {
//     const response = await request(server).post("/api/auth/login").send(userB);
//     expect(response.body).toBe("invalid credentials");
//   });
// });

// describe("/jokes endpoint", () => {
//   beforeEach(async () => {
//     await db("users").truncate();
//     await request(server).post("/api/auth/register").send(userA);
//   });
//   it("gives 200 status on success", async () => {
//     const {
//       body: { token },
//     } = await request(server).post("/api/auth/login").send(userA);
//     const res = await request(server)
//       .get("/api/jokes")
//       .set("Authorization", token);
//     expect(res.status).toBe(200);
//   });
//   it("requires token", async () => {
//     const response = await request(server).get("/api/jokes");
//     expect(response.body).toBe("token required");
//   });
// });
