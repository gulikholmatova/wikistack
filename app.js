const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

const models = require('./models');
const db = models.db;
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public'))); //serving up static files (e.g. css files)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.redirect('/wiki');
});

// Adding an error handler:
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Something went wrong!');
});

// Adding a client error handler:
app.use((req, res) => {
  res.status(400).send('The page you requested is not found!');
});

db.authenticate().then(() => {
  console.log('connected to the database');
});

const PORT = 8080;
const init = async () => {
  await db.sync({ force: true });
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
