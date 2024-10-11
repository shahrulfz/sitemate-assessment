// server.test.js
import request from "supertest";
import { startServer } from "./server"; // Adjust the path as needed

describe("API Issues", () => {
  let server;

  beforeAll(async () => {
    server = await startServer(); // Start the server and get the HTTP server instance
  });

  afterAll((done) => {
    server.close(done); // Use done callback to close server
  });

  test("GET /api/issues should return a list of issues", async () => {
    const response = await request(server).get("/api/issues");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, title: "Issue 1", description: "Description for issue 1" },
      { id: 2, title: "Issue 2", description: "Description for issue 2" },
    ]);
  });

  test("POST /api/issues should create a new issue", async () => {
    const newIssue = { title: "New Issue", description: "New description" };
    const response = await request(server).post("/api/issues").send(newIssue);

    expect(response.status).toBe(201);
    expect(response.body.data).toMatchObject(newIssue);
    expect(response.body.data.id).toBe(3); // Assuming there are already 2 issues
  });

  test("PUT /api/issues/:id should update an existing issue", async () => {
    const updatedIssue = {
      title: "Updated Issue",
      description: "Updated description",
    };
    const response = await request(server)
      .put("/api/issues/1")
      .send(updatedIssue);

    expect(response.status).toBe(200);
    expect(response.body.data).toMatchObject({ id: 1, ...updatedIssue });
  });

  test("DELETE /api/issues/:id should delete an issue", async () => {
    const response = await request(server).delete("/api/issues/1");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Issue with ID 1 deleted");

    // Check that the issue is actually deleted
    const getResponse = await request(server).get("/api/issues");
    expect(getResponse.body.length).toBe(2); // Should have 2 issues left
  });
});
