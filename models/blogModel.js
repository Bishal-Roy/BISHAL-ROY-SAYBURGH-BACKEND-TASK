const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  blogs: [
    {
      blog: {
        type: 'string',
      },
      comments: [
        {
          comment: {
            type: 'string',
          },
          user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
          },
        },
      ],
    },
  ],
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
