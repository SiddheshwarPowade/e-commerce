import express from "express";
import cors from "cors";
import "./db/config.js";
import { User } from "./db/User.js";
import { Product } from "./db/Product.js";
import Jwt from "jsonwebtoken";
const jwtKey = "e-comm";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "300s" }, (err, token) => {
    if (err) {
      res.json({
        returnCode: 0,
        data: {},
        message: "Something went wrong, Please try after sometime",
      });
      // res.send({
      //   result: "Something went wrong, Please try after sometime",
      // });
    } else {
      res.json({
        returnCode: 1,
        data: { result, auth: token },
        message: "Registered successfully",
      });
      // res.send({ result, auth: token });
    }
  });
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body, { password: 0 });
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.json({
            returnCode: 0,
            data: {},
            message: "Something went wrong, Please try after sometime",
          });
          // res.send({
          //   result: "Something went wrong, Please try after sometime",
          // });
        } else {
          res.json({
            returnCode: 1,
            data: { user, auth: token },
            message: "",
          });
          // res.send({ user, auth: token });
        }
      });
    } else {
      res.json({
        returnCode: 0,
        data: {},
        message: "No user found",
      });
      // res.send({ result: "No user found" });
    }
  } else {
    res.json({
      returnCode: 0,
      data: {},
      message: "No user found",
    });
    // res.send({ result: "No user found" });
  }
});

app.post("/add-product", verifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.json({
    returnCode: 1,
    data: result,
    message: "",
  });
  // res.send(result);
});

app.get("/products", verifyToken, async (req, res) => {
  let products = await Product.find();
  if (products.length) {
    res.json({
      returnCode: 1,
      data: products,
      message: "",
    });
    // res.send(products);
  } else {
    res.json({
      returnCode: 0,
      data: [],
      message: "",
    });
    // res.send([]);
  }
});

app.delete("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  res.json({
    returnCode: 1,
    data: result,
    message: "Deleted successfully",
  });
  // res.send(result);
});

app.get("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.json({
      returnCode: 1,
      data: result,
      message: "Data fetched successfully",
    });
    // res.send(result);
  } else {
    res.json({ returnCode: 1, data: [], message: "No records found" });
    // res.send({ result: "No records found" });
  }
});

app.put("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );

  res.json({ returnCode: 1, data: result, message: "" });
  // res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: `^${req.params.key}` } },
      { company: { $regex: `^${req.params.key}` } },
      { category: { $regex: `^${req.params.key}` } },
    ],
  });

  res.json({ returnCode: 1, data: result, message: "" });
  // res.send(result);
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.json({
          returnCode: 0,
          data: [],
          message: "Please provide valid token",
        });
        // res.status(401).send({ result: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    res.json({
      returnCode: 0,
      data: [],
      message: "Please add token with header",
    });
    // res.status(403).send({ result: "Please add token with header" });
  }
}
app.listen(5000);
