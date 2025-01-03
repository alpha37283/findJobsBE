const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
  },
  receiverId: {
    type: String,
    required: true,
  },
  receiverName: {
    type: String,
  },
  chatId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: null,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', MessageSchema);
