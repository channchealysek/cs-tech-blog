const router = require("express").Router();
const { Post, User, Comment } = require("../models/");
const { getAttributes } = require("../models/User.js");
const withAuth = require("../utils/auth.js");

// get all posts for homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
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
      if (post.user.id === req.session.user_id) {
        res.render("user-single-post", {
          post,
          loggedIn: req.session.loggedIn,
        });
      } else {
        res.render("single-post", { 
          post, 
          loggedIn: req.session.loggedIn, 
        });
      }

    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// giving you the login and signup route pieces below, no changes needed.
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }

  res.render("signup");
});

module.exports = router;
