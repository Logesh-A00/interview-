// ----------------------
// 5. Comment Routes (routes/commentRoutes.js)
// ----------------------
const Comment = require('../models/Comment');
const express = require('express');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/:ticketId', auth, async (req, res) => {
  const comment = new Comment({
    ticketId: req.params.ticketId,
    author: req.user.id,
    text: req.body.text
  });
  await comment.save();
  res.status(201).json(comment);
});

router.get('/:ticketId', auth, async (req, res) => {
  const comments = await Comment.find({ ticketId: req.params.ticketId });
  res.json(comments);
});

module.exports = router;
