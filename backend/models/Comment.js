// models/Comment.js
const mongoose = require('mongoose'); // ✅ ADD THIS LINE

const commentSchema = new mongoose.Schema({
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  author: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', commentSchema);
