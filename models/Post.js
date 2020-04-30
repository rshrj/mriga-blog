const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true,
    default: ['Uncategorized']
  },
  body: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('posts', PostSchema);
