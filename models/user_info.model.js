const mongoose = require('mongoose');


const sellerInfo = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type: String,
        required: true,
        unique : true 
    },    
    servicesOffering : {
        type : [String],
        required : true,
        validate: [arrayLimit, '{PATH} exceeds the limit of 5 services']

    },
    location : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        min: 0,
        max: 5,
        default: 0
    },
    bio : {
        type : String
    }
}, {timestamps : true})

function arrayLimit(val) {
    return val.length <= 5;
}

const Seller = mongoose.model('Seller', sellerInfo);

module.exports = Seller;
