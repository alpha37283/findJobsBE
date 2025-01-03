const express = require('express');
const routerMessage = express.Router();
const { createMessage, getMessages, getChatList } = require('../controller/message.controller.js');

routerMessage.post('/send', createMessage);
routerMessage.get('/:chatId', getMessages);
routerMessage.get('/chatList/:receiverId', getChatList);

module.exports = routerMessage;
