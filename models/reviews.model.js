// sellerId: Reference to the seller being reviewed.
// rating: Numeric rating (1-5).
// reviewText: Text review of the service.
// jobId: Reference to the completed job.

const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    sellerId : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref: 'Seller' 
    },
    rating : {
        type : Number,
        min : 1,
        max : 5
    },
    reviewText: {
        type: String,
        required: true
    },
    serviceReqId : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : 'ServiceRequested'
    }
})

const Reviews = mongoose.model('Reviews', reviewsSchema);

module.exports = Reviews;