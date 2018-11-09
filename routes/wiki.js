const router = require('express').Router();
const { Page } = require('../models');
const { addPage } = require('../views');

router.get('/', (req, res) => {
  res.send("I'm / and im here!");
});

// router.post('/', (req, res) => {
//   res.json(req.body);
// });

router.get('/add', (req, res) => {
  res.send(addPage());
});

router.post('/', async (req, res, next) => {
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    slug: req.body.title,
  });
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    console.log(page);
    await page.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/:slug', async (req, res, next) => {
  const foundPage = await Page.findOne({
    where: { slug: req.params.slug },
  });
  res.json(foundPage);
});

module.exports = router;
