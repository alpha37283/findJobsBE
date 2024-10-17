const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const servicesSchema = new Schema({
    sellerId: {
        type: Types.ObjectId, // Correct reference for ObjectId
        required: true, // Fixed typo (require -> required)
        ref: 'Seller' // If you're referencing the seller's collection
    },
    status: {
        type: String,
        enum: ['Pending', 'InProgress', 'Completed'], // Restricted to 3 options => enumerations 
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
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Card'], // Two payment options only
        required: true
    }
});

const ServiceRequested = mongoose.model('ServiceRequested', servicesSchema);

module.exports = ServiceRequested;
