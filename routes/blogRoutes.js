const express = require('express');
const {
  createBlog,
  updateBlog,
  deleteBlog,
  createComment,
  getBlog,
} = require('../controlers/blogControler');
const protect = require('../middleware/protect');
const router = express.Router();

router.get('/', getBlog);
router.post('/create', protect, createBlog);
router.put('/update/:id', protect, updateBlog);
router.delete('/delete/:id', protect, deleteBlog);
router.put('/create/comment/:id', protect, createComment);

module.exports = router;
