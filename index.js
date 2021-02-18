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

app.use(`/api/project`, require(`./API/project`));
app.use(`/api/document`, require(`./API/document`));
app.use('/api/tasks', require('./API/tasks'));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
