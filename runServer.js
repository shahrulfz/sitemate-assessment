// runServer.js
const { startServer } = require("./server");

startServer().catch((err) => {
  console.error(err);
  process.exit(1);
});
