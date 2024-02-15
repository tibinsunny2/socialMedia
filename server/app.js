const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
// making connection with the local database mongodb wuth the current project
mongoose.connect("mongodb://0.0.0.0:27017/instagram");
mongoose.connection.on("connected", () => {
  console.log("connected to mongoo");
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});

// registering the schemas / models to the starting point
require("./Model/user");
require("./Model/post");

// parsing all the incoming datas into the json format
app.use(express.json());

// giving command to the strating point to access these routes
app.use(require("./routes/auth"));
app.use(require("./routes/postRoute"));
app.use(require("./routes/user"))

// alocating the port for the programme exhicution
app.listen(PORT, () => {
  console.log("server is running ate :", PORT);
});
// 2ODOXkIXSsE1qTGA
