const express = require("express");
const hpp = require('hpp');
const cors = require('cors')
const PORT = 3000;

//initalize express app
const app = express();

//enables cross orgin resource sharing
app.use(cors());

//initalize request middleware
app.use(express.json());

//stops http parameter pollution
app.use(hpp());

app.get('/', (req, res) => {
    res.send('Hello World!')
  });

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });