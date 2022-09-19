const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(__dirname + "/dist/lov-pets"));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/lov-pets/index.html"));
});

app.listen(process.env.PORT || 5000);
