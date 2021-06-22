const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
  {
    blogOwner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    blog: {
      type: String,
      required: true,
    },
    comments: [
      {
        comment: {
          type: String,
          required: true,
        },
        commentOwnerId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
