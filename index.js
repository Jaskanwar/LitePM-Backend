const express = require("express");
const hpp = require("hpp");
const cors = require("cors");
const connectMongo = require("./config/config");
const PORT = 3000;

const Projects = require("./Models/Projects");

//initalize express app
const app = express();

//enables cross orgin resource sharing
app.use(cors());

//initalize request middleware
app.use(express.json());

//stops http parameter pollution
app.use(hpp());

connectMongo();

app.get("/", (req, res) => {
  let name = "Jaskanwar";
  let email = "Test2@gmail.com"
  let project = new Projects({
    name,
    email
  });
  res.send("Hello World!");
  project.save();
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
