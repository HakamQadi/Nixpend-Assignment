const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const columnSchema = new mongoose.Schema({
    title: String,
    cards: [
        {
            title: String,
            description: String,
            subtasks: [
                {
                    title: String
                }
            ],
            status: String,
        }
    ],
});

const Columns = mongoose.model("Columns", columnSchema);

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

module.exports = Columns;
