const router = require("express").Router();
const { Post } = require("../../models/");
const withAuth = require("../../utils/auth");

// create post
router.post("/", withAuth, async (req, res) => {
  const body = req.body;
  try {
    const newPost = await Post.create({ ...body, user_id: req.session.user_id });
    if (newPost) {
      res.status(200).end();
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

// edit post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    } else {
      res.json(dbPostData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dbPostData  = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dbPostData ) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    } else {
      res.json(dbPostData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
