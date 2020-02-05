const express = require("express");
const path = require("path");
const app = express();
const database = require("./modules/database-operations");
const endpoints = require("./modules/endpoints");
const port = process.env.PORT || 8000;

endpoints(app);

///// Accessing html, css and image folder from public folder ///////
app.use(express.static("public"));

///// Routing the response to display on different html pages///////

app.get("/", (request, response) => {
  response.sendFile(path.resolve(__dirname + "/index.html"));
});

app.get("/product.html", (request, response) => {
  response.sendFile(path.resolve(__dirname, "product.html"));
});

app.get("/shoppingcart.html", (request, response) => {
  response.sendFile(path.resolve(__dirname, "shoppingcart.html"));
});

////// Start the port and initiate / create dbase as eshop.json //////////
app.listen(port, () => {
  console.log("Server started on port: ", port);
  database.initiateDatabase();
});
