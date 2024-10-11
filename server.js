// server.js
const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const issues = [
  { id: 1, title: "Issue 1", description: "Description for issue 1" },
  { id: 2, title: "Issue 2", description: "Description for issue 2" },
];

// Create a function to initialize the server
const createServer = () => {
  const server = express();
  server.use(express.json());

  server.post("/api/issues", (req, res) => {
    const newIssue = req.body;

    // Generate a unique ID for the new issue
    const newId =
      issues.length > 0 ? Math.max(...issues.map((issue) => issue.id)) + 1 : 1;
    const issueWithId = { ...newIssue, id: newId };

    issues.push(issueWithId);

    res.status(201).json({ message: "Issue created", data: issueWithId });
  });

  server.get("/api/issues", (req, res) => {
    res.status(200).json(issues);
  });

  server.put("/api/issues/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedIssue = req.body;

    // Ensure the updated issue contains the correct ID
    updatedIssue.id = id;
    const index = issues.findIndex((issue) => issue.id === id);

    if (index !== -1) {
      issues[index] = updatedIssue;
      res.status(200).json({ message: "Issue updated", data: updatedIssue });
    } else {
      res.status(404).json({ message: "Issue not found" });
    }
  });

  server.delete("/api/issues/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = issues.findIndex((issue) => issue.id === id);

    if (index !== -1) {
      const deletedIssue = issues.splice(index, 1);
      console.log("Deleted Issue:", deletedIssue);
      res.status(200).json({ message: `Issue with ID ${id} deleted` });
    } else {
      res.status(404).json({ message: "Issue not found" });
    }
  });

  // Catch all other routes and let Next.js handle them
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  return server; // Return the server instance for external use
};

// Export a function to start the server
const startServer = async () => {
  await app.prepare();
  const port = process.env.PORT || 3000;
  const server = createServer();

  // Allow for graceful shutdowns
  const httpServer = server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });

  return httpServer; // Return the server instance for testing
};

// Export the server creation function for testing
module.exports = { createServer, startServer };
