const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./Routers/Routes");
const dotenv = require("dotenv");
dotenv.config({ path: "./conf.env" });

app.use(cors());
app.use(express.json());

app.use("/home", routes);

app.listen(8080, () => {
  console.log("http://localhost:8080");
});
