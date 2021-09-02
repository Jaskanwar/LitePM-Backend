const express = require("express");
const hpp = require("hpp");
const cors = require("cors");
const connectMongo = require("./config/config");
const PORT = 443;
const Projects = require("./Models/Projects");

const fs = require('fs');
const https = require('https');

const privateKey = fs.readFileSync('./certificates/private.key', 'utf8');
const certificate = fs.readFileSync('./certificates/certificate.crt', 'utf8');
const ca = fs.readFileSync('./certificates/ca_bundle.crt', 'utf8');
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
app.use('/api/members', require('./API/members'));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const credentials = {
key: privateKey,
cert: certificate,
ca: ca
};

/*
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
*/


https.createServer(credentials, app)
.listen(PORT, function () { console.log('Example app listening on port 443!')
})