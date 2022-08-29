const router = require("express").Router();
const { Comment } = require("../../models/");
const withAuth = require("../../utils/auth.js");

// create a new comment
router.post("/", withAuth, async (req, res) => {
  const body = req.body;

  try {
    const newComment = await Comment.create({
      ...body,
      user_id: req.session.user_id,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit post comment
router.put('/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Comment.update(req.body, {
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

// delete comment
router.delete("/:id", withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment found with this id!" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
