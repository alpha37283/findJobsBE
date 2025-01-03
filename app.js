const express = require('express')
const app = express();

const connectToMongo = require('./config/job.connect_db.js')


const http = require('http');
const messageRoutes = require('./routes/message.routes');
const initializeSocket = require('./socket.io.js');

const server = http.createServer(app);
initializeSocket(server);


const routerSeller = require('./routes/seller.routes.js')
const routerServices = require('./routes/services.routes.js');
const { default: mongoose } = require('mongoose');
const routerReviews = require('./routes/reviews.routes.js')

const PORT = process.env.PORT || 3000;
const PORT2 = process.env.PORT2 || 5000;

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use('/api/sellers', routerSeller);
app.use('/api/services', routerServices);
app.use('/api/reviews', routerReviews);
app.use('/api/messages', messageRoutes);



app.get('/', (req, res) => {
    res.send('HELLO THIS IS HOME !!!');
})



connectToMongo()
    .then(() => {
        console.log('Connected to MongoDB');
        // app.listen(PORT2, () => {
        //     console.log(`Node server is listening at port: ${PORT2}`);
        // });
        
        server.listen(PORT2, () => {
            console.log(`Server http is running on port ${PORT2}`);
          });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });






