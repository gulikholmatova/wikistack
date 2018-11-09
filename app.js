const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const models = require('./models');
const db = models.db;
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});
app.get('/wiki', (req, res) => {
  res.redirect('/');
});

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

db.authenticate().then(() => {
  console.log('connected to the database');
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
