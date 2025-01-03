const socketIo = require('socket.io');
const Message = require('./models/message.model.js'); // Adjust the path as necessary

const initializeSocket = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendMessage', async (data) => {
      const { senderId, senderName, receiverId, receiverName, text, image } = data;
      const chatId = data.chatId || (senderId < receiverId ? `${senderId}_${receiverId}` : `${receiverId}_${senderId}`);

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
      console.log('Message sent in server.js => ', text);
      io.emit('receiveMessage', newMessage);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

module.exports = initializeSocket;