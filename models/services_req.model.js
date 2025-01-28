const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const servicesSchema = new Schema({
    sellerId: {
        type: Types.ObjectId, 
        required: true,
        ref: 'Seller' 
    },
    buyerId: {
        type : Types.ObjectId,
    //    required : true,
    },
    buyerName : {
        type : String,
        required : true,
    },
    serviceRequested : {
        type : String,
        required : true,
    },
    status: {
        type: String,
        enum: ['Pending', 'InProgress', 'Completed','Cancelled'], // Restricted to 3 options => enumerations 
        default: 'Pending',
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    scheduledTime: {
        type: Date,
        required: true
    },
    price : {
        type : Number,
        required : true,
        min : 300,
        max : 10000,
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Card'], // Two payment options only
        required: true
    },
    address : {
        type : String,
        required : true,
    },
    contactNumber : {
        type : String,
        required : true
    },
    requestCreatedAt: {
        type: Date,
        default: Date.now, 
    }, 
    requestUpdatedAt: {
        type: Date,
    },

});

const ServiceRequested = mongoose.model('ServiceRequested', servicesSchema);

module.exports = ServiceRequested;
