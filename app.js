const express = require('express')

const connectToMongo = require('./config/job.connect_db.js')

const routerSeller = require('./routes/seller.routes.js')
const routerServices = require('./routes/services.routes.js')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use('/api/sellers', routerSeller);
app.use('/api/services', routerServices)


app.get('/', (req, res) => {
    res.send('HELLO THIS IS HOME !!!');
})


connectToMongo()
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log('Hello, I am listening at port:', PORT);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit the process if unable to connect
    });






