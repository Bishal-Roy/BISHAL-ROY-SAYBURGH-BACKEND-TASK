const Blog = require('../models/blogModel');

//get all the blogs
const getBlog = async (req, res) => {
  const data = await Blog.find({}).populate('commentOwnerId', 'name email');
  res.status(200).json({ data });
};

//create a new blog
const createBlog = async (req, res) => {
  const { blog, title } = req.body;
  try {
    const bloggar = await Blog.create({
      blogOwner: req.userId,
      title: title,
      blog: blog,
    });

    res.json({ bloggar });
  } catch (error) {
    console.error(error);
    res.json({ error: error });
  }
};

//update blog
const updateBlog = async (req, res) => {
  const { blog, title } = req.body;
  try {
    const blogfound = await Blog.findById(req.params.id);

    //checking blog of this id is available or not and compare the blog owner id with the current user id
    if (blogfound && blogfound.blogOwner == req.userId) {
      blogfound.title = title;
      blogfound.blog = blog;
      const updatedBlog = await blogfound.save();
      res.json(updatedBlog);
    } else {
      res
        .status(404)
        .json({ message: 'blog not found or your are not allowed to update' });
    }
  } catch (error) {
    res.json({ error: error });
  }
};

//delete blog
const deleteBlog = async (req, res) => {
  try {
    const blogfound = await Blog.findById(req.params.id);

    if (blogfound && blogfound.blogOwner == req.userId) {
      await blogfound.remove();
      res.json({ message: 'Blog removed successfully' });
    } else {
      res
        .status(404)
        .json({ message: 'Blog not found or You are not allowed to delete' });
    }
  } catch (error) {
    res.json({ error: error });
  }
};

//giving comments on the blog
const createComment = async (req, res) => {
  const { comment } = req.body;

  try {
    const blogfound = await Blog.findById(req.params.id);

    if (blogfound && req.userId) {
      blogfound.comments.push({
        comment: comment,
        commentOwnerId: req.userId,
      });
      const updateBlog = await blogfound.save();
      res.json(updateBlog);
    } else {
      res.status(404).json({ message: 'blog not found' });
    }
  } catch (error) {
    res.json({ error: error });
  }
};

module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  createComment,
  getBlog,
};
