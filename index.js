const fs = require("fs");

const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

// using express server
const express = require("express");
const morgan = require("morgan");
const { userInfo } = require("os");
const server = express();

server.use(express.json()); // for reading body
// making my own custom middleware (application level)

server.use(morgan("default")); // using the third party middleware
server.use(express.static("public")); // this is for giving the file access from public folder files (http://localhost:8080/data.json)

server.use((req, res, next) => {
  console.log(
    req.method,
    req.ip,
    req.hostname,
    new Date(),
    req.get("User-Agent")
  ); //making a logger for server activities
  next(); // use of next to move ahead from middleware otherwise it gets stuck here
});

const auth = (req, res, next) => {
  //   if (req.body.password == 123) {
  //     // http://localhost:8080/?password=123 for req.query.password
  //     next();
  //   } else {
  //     res.sendStatus(401);
  //   }
  next();
};

// making a single url for differnt method of request
// API - Endpoint - Route
server.get("/product/:id", auth, (req, res) => {
    console.log(req.params)    // also we can get with params
  // api level middleware (auth) 
  res.json({ type: "GET" });
});

server.post("/", auth, (req, res) => {
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
