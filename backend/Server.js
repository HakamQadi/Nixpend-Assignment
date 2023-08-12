const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./conf.env" });
const routes = require("./Routers/Routes");

app.use(cors());
app.use(express.json());


app.use("/home", routes);






app.listen(8080, () => {
  console.log("http://localhost:8080");
});
