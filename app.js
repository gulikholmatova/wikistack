const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const { db } = require('./models');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

db.authenticate().then(() => {
  console.log('connected to the database');
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
  },
  slug: {
    type: Sequelize.STRING,
  },
  content: {
    type: Sequelize.TEXT,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
});

module.exports = { Page, User };

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
