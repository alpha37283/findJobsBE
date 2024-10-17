const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config();

const connectToMongo = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connection Successful at : ${connection.connection.host}`);
    }
    catch(err){
        console.log('An error occured : ', err );
    }
}

module.exports = connectToMongo;