const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world!");
})