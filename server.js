const jsonServer = require("./node_modules/json-server");
const auth = require("./node_modules/json-server-auth");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();

// Bind the auth middleware to the server
server.db = router.db;
server.use(middlewares);
server.use(auth);
server.use(router);

server.listen(8000, () => {
  console.log("JSON Server is running on port 8000");
});
