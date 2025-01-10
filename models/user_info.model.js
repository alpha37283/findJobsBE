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
        validate: [arrayLimit, '{PATH} exceeds the limit of 5 services']

    },
    location : {
        type : String, 
    },
    rating : {
        type : Number,
        min: 0,
        max: 5,
        default: 0
    },
    bio : {
        type : String
    },
    order : {
        active : {
            type : Number,
            min : 0,
            default : 0,
        },
        total : {
            type : Number,
            min : 0,
            default : 0,
        },
    },
    income : {
        monthly : {
            type : Number,
            min : 0,
            default : 0
        },
        total : {
            type : Number,
            min : 0,
            default : 0,
        },
    },
    contactNumber : {
        type : String,
    },
    profileImage: { 
        data: {
            type: Buffer,
            default: undefined, 
        },       
        contentType: {
            type: String,
            default: undefined, 
        }
    },
}, {timestamps : true})

function arrayLimit(val) {
    return val.length <= 5;
}

const Seller = mongoose.model('Seller', sellerInfo);

module.exports = Seller;
