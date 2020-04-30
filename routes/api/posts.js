const express = require('express');
const axios = require('axios');
const { validationResult } = require('express-validator');

const Post = require('../../models/Post');
const { validatePost } = require('../../util/validation');

const router = express.Router();

String.prototype.isAlphaNumeric = function () {
  var regExp = /^[A-Za-z0-9]+$/;
  return this.match(regExp);
};

const parseTags = (rawTags) => {
  let tags = rawTags.split(',').map((tag) => tag.trim().toLowerCase());
  if (tags.filter((tag) => !tag.isAlphaNumeric()).length > 0) {
    throw new Error('Tags must be alphanumberic');
  }
  return tags;
};

// @route   GET /api/posts
// @desc    Get a list of posts sorted by time of post
// @access  Public
router.get('/', async (req, res) => {
  try {
    let raw_posts = await Post.find().sort('-created_at');
    let posts = raw_posts.map((post) => ({
      id: post.id,
      title: post.title,
      tags: post.tags,
      image: post.image,
      body: post.body,
      created_at: post.created_at
    }));
    return res.json({ success: true, posts });
  } catch (error) {
    console.log('Server Error');
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route   POST /api/posts
// @desc    Create a new post
// @access  Public
router.post('/', validatePost, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { title, tags, body } = req.body;

  try {
    let tagsParsed = parseTags(tags);

    let randomPic = await axios.get('https://picsum.photos/600/300', {
      maxRedirects: 0,
      validateStatus: null
    });

    let post = new Post({
      title,
      tags: tagsParsed,
      image: randomPic.headers.location,
      body
    });

    await post.save();
    return res.json({ success: true, post });
  } catch (error) {
    console.log('Server Error');
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

module.exports = router;
