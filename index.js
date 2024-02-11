// using express server
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const { userInfo } = require("os");
const server = express();
const productController = require("./controller/product");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

// console.log("env", process.env);
// db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("Database Connected");
}

// schema
server.use(cors());
server.use(express.json()); // for reading body
// making my own custom middleware (application level)

server.use(morgan("default")); // using the third party middleware
server.use(express.static(process.env.PUBLIC_DIR)); // this is for giving the file access from public folder files (http://localhost:8080/data.json)

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
server.use("/products", productRouter.router); // this is the base url in simple terms
server.use("/users", userRouter.router); // this is for the users
const auth = (req, res, next) => {
  //   if (req.body.password == 123) {
  //     // http://localhost:8080/?password=123 for req.query.password
  //     next();
  //   } else {
  //     res.sendStatus(401);
  //   }
  next();
};

// MVC  Model-View-Conntroller
//model = like rules , database
//view = like what we see or server side template rendering
//controller = controll the logic between the model and view or logic

server.listen(process.env.PORT, () => console.log("Server Started"));
