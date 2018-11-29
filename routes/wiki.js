const router = require('express').Router();
const { Page, User } = require('../models');
const { addPage, main } = require('../views');
const { wikiPage } = require('../views');

router.get('/', async (req, res) => {
  try {
    const pages = await Page.findAll();
    // pages is an array as we use .map on pages in main.js
    res.send(main(pages));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const author = await User.create({
      name: req.body.author,
      email: req.body.title,
    });
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
      slug: req.body.title,
    });
    page.setAuthor(author);
    res.redirect('/wiki/' + page.slug);
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });

    if (page === null) {
      res.status(404).send('The page you requested does not exist.');
    } else {
      res.send(wikiPage(page));
      res.send('Hello world');
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
