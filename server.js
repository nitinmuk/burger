const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./controllers/burgersControllers.js");

const PORT = process.env.PORT || 8080;

const server = express();

// Serve static content for the app from the "public" directory in the application directory.
server.use(express.static("public"));

// Parse application body as JSON
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.engine("handlebars", exphbs({ defaultLayout: "main" }));
server.set("view engine", "handlebars");

server.use(routes);

server.listen(PORT, () => {
  console.log("Server listening on: http://localhost:" + PORT);
});
