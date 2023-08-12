const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const mySchema = new mongoose.Schema({
  title: String,
  description: String,
  subtasks: Array,
  status: String,
});

const ToDo = mongoose.model("ToDo", mySchema);

mongoose
  .connect(process.env.CONN_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.error("DB connection error:", error);
  });

module.exports = ToDo;
