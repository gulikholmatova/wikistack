const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const models = require("./models");
const db = models.db;

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

db.authenticate().then(() => {
  console.log("connected to the database");
});

const PORT = 3000;
const init = async () => {
  await db.sync({ force: true });
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();

// app.listen(PORT, () => {
//   console.log(`App listening in port ${PORT}`);
// });
