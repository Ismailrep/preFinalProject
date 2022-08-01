const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // enable cors for all requests
app.use(fileUpload({
  useTempFiles: true,
}));
//routes
readdirSync("./routes").map((e) => app.use("/", require("./routes/" + e)));

//database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
})
.then(() => console.log("Database connected"))
.catch((err) => console.log(err));


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
