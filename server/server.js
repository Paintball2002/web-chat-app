const path = require("path");
const express = require("express");
const connect = require("connect");

var app = connect().use(connect.static(__dirname + '/public'));

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is up on port "+port)
});
