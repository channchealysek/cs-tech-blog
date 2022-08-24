const router = require('express').Router();

const { Post, User, Comment } = require('../models/');

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', { posts});
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post
router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findOne({
        where: {id: req.params.id},
        include: [
          User,
          {
            model: Comment,
            include: [User],
          },
        ],
      });
  
      if (postData) {
        const post = postData.get({ plain: true });
        res.render('single-post', { post});
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;