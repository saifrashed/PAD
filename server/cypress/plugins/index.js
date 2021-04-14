const express = require("express");
const app = express();

app.use(express.static("../src"));
app.listen(3000);

console.log("Server running on port 8080");

module.exports = (on, config) => {};
