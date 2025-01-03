const Message = require('../models/message.model');

const express = require('express')
const app = express();

const { default: mongoose } = require('mongoose');

app.use(express.urlencoded({extended : true}));
app.use(express.json());

const createMessage = async (req, res) => {

  // if (!senderId || !receiverId || !text || !senderName || !receiverName || !chatId) {
  //   console.log('Missing field')
  //   return ;
  // }

  try {
    const { senderId, senderName, receiverId, receiverName, text, image } = req.body;
    const chatId = req.body.chatId || (senderId < receiverId ? `${senderId}_${receiverId}` : `${receiverId}_${senderId}`);

    const newMessage = new Message({
      senderId,
      senderName,
      receiverId,
      receiverName,
      chatId,
      text,
      image: image ? { data: image.data, contentType: image.contentType } : null
    });

    await newMessage.save();
    console.log('Message sent => ', text);
    res.status(201).json(newMessage);

  } catch (error) {
    console.log('Message not saved !!!')
    res.status(500).json({ error: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getChatList = async (req, res) => {
  try {
    const { receiverId } = req.params;

    // Find all messages where the user is either the sender or receiver
    const messages = await Message.find({
      $or: [{ senderId: receiverId }, { receiverId: receiverId }],
    }).sort({ createdAt: -1 }); // Sort by most recent message

    // Use a map to group messages by chatId
    const chatMap = new Map();

    messages.forEach((message) => {
      const chatId = message.chatId;

      if (!chatMap.has(chatId)) {
        const isSender = message.senderId === receiverId;

        chatMap.set(chatId, {
          _id : message._id,
          id: isSender ? message.receiverId : message.senderId, // The other user in the chat
          name: isSender ? message.receiverName : message.senderName, // Their name
          receiverId : message.receiverId,
          lastMessage: message.text || '[Image]', // Last message text or image placeholder
          chatId : message.chatId,
          timestamp: formatTime(message.createdAt), // Custom function to format time
          avatar: '../assets/icon.png', // Placeholder avatar
        });
      }
    });

    // Convert Map to Array for response
    const chatList = Array.from(chatMap.values());

    res.status(200).json({ success: true, data: chatList });
  } catch (error) {
    console.log('An error occurred while fetching the chat list => ', error);
    res.status(500).json({ error: error.message });
  }
};

// Helper function to format time
function formatTime(date) {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 60000); // Difference in minutes

  if (diff < 60) {
    return `${diff} min ago`;
  } else if (diff < 1440) {
    return `${Math.floor(diff / 60)} hr ago`;
  } else {
    return `${Math.floor(diff / 1440)} days ago`;
  }
}



module.exports = { createMessage, getMessages, getChatList };



