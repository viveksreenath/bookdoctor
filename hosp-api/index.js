import express from "express";
import routes from "./routes/index.js";
import mongoose from "./db/index.js";
import cors from "cors";

const App = express();
App.use(cors());

App.use(express.json());
App.use(express.static("uploads"));

App.use(routes);

App.get("/", (req, res) => {
  res.send("working");
});

App.use("*", (req, res) => {
  res.status(404).send("no routes found");
});

App.listen(3000, () => {
  console.log("App is running @ localhost: 3000");
});
