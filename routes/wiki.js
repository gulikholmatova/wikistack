const router = require('express').Router();
const { addPage } = require('../views');

router.get('/', (req, res) => {
  res.send("I'm / and im here!");
});

router.post('/', (req, res) => {
  res.json(req.body);
});

router.get('/add', (req, res) => {
  res.send(addPage());
});

module.exports = router;
