const fs = require("fs");

const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

// using express server
const express = require("express");
const server = express();

// making a single url for differnt method of request
// API - Endpoint - Route
server.get("/", (req, res) => {
  res.json({ type: "GET" });
});

server.post("/", (req, res) => {
  res.json({ type: "POST" });
});

server.patch("/", (req, res) => {
  res.json({ type: "PATCH" });
});

server.put("/", (req, res) => {
  res.json({ type: "PUT" });
});

server.delete("/", (req, res) => {
  res.json({ type: "DELETE" });
});

server.get("/demo", (req, res) => {
  // res.json(products)
  // res.sendStatus(404)
  res.status(201).send("<h1>hello</h1>");
  // res.sendFile('C:\\Users\\HP\\Desktop\\node-app\\index.html');
  // in above sendfile \ is replaced by \\ because itis asking for the absolute file
});

server.listen(8080, () => console.log("Server Started"));
