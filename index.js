const express = require("express");
const hpp = require("hpp");
const cors = require("cors");
const connectMongo = require("./config/config");
const PORT = 3000;

const User = require("./Models/user");
const { getMaxListeners } = require("./Models/user");

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
  let email = "Test@gmail.com"
  let user = new User({
    name,
    email
  });
  res.send("Hello World!");
  user.save;
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
