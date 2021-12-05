const request = require("supertest");
const app = require("../app");
const db = require("../config/postgres");

describe("Testing methods with database connection", () => {
  let sequelize = db;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  test("Get method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  test("Get method", async () => {
    const response = await request(app).get("/entrylogs");

    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toBe("object");
  });

  test("Add method - correct params", async () => {
    const response = await request(app)
      .post("/entrylogs/add")
      .send({
        startDateTime: "2021-12-05T17:31:22.253Z",
        endDateTime: "2022-12-05T17:31:22.253Z",
        description: "Testing",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);

    expect(response.statusCode).toBe(200);
  });

  test("Add method - no startDateTime", async () => {
    const response = await request(app)
      .post("/entrylogs/add")
      .send({
        endDateTime: "2022-12-05T17:31:22.253Z",
        description: "Testing",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);

    expect(response.statusCode).toBe(400);
  });

  test("Add method - no endDateTime", async () => {
    const response = await request(app)
      .post("/entrylogs/add")
      .send({
        startDateTime: "2021-12-05T17:31:22.253Z",
        description: "Testing",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);

    expect(response.statusCode).toBe(400);
  });

  test("Add method - no description", async () => {
    const response = await request(app)
      .post("/entrylogs/add")
      .send({
        description: "",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);

    expect(response.statusCode).toBe(400);
  });

  test("Add method - startDateTime > endDateTime (not correct)", async () => {
    const response = await request(app)
      .post("/entrylogs/add")
      .send({
        startDateTime: "2023-12-05T17:31:22.253Z",
        endDateTime: "2022-12-05T17:31:22.253Z",
        description: "Testing",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);

    expect(response.statusCode).toBe(400);
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
