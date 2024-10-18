const express = require('express')
const { default: mongoose } = require('mongoose');


const ServiceRequested = require('../models/services_req.model.js');
const Seller = require('../models/user_info.model.js');
const Reviews = require('../models/reviews.model.js');

const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());

const deleteReview =  async (req, res) => {

    const {id} = req.params;

    if(!id || !mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({err : "Invalid or missing ID"});

    try{
        await Reviews.findByIdAndDelete(id);
        res.status(200).json({success : true, msg : "Review Successfully deleted"});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send(err);
    }
}


const getReview = async (req, res) => {

    const {id} = req.params;

    if(!id || !mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({err : "Invalid or missing ID"});

    try{

    const getReview = await Reviews.findById(id);

    if(!getReview)
        return res.status(400).json({err : "Review not found"});

    res.status(200).json({success : true, getReview});

    }
    catch(err)
    {
        console.log(err);
        res.status(500).send(err);
    }
}


const postReview = async (req, res) => {

    const {sellerId, rating, reviewText, serviceReqId} = req.body;

    if(!sellerId || !mongoose.Types.ObjectId.isValid(sellerId)
    || !serviceReqId || !mongoose.Types.ObjectId.isValid(serviceReqId))
        return res.status(400).json({err : 'One of Invalid or Missing ID !!!'});

    if(!rating || (rating > 5 || rating < 0))
        return res.status(400).json({err : "Please enter a rating !!!"});



    try{

        const review = new Reviews({
            sellerId,
            rating,
            reviewText,
            serviceReqId
        })

        const seller = await Seller.findById(sellerId);
        const job = await ServiceRequested.findById(serviceReqId);

        if(!seller || !job)
            return res.status(400).json({success : false, err : 'Seller or Job does not exist !!'});

        await review.save();

        res.status(200).json({success : true, review });

    }
    catch(err)
    {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports = {postReview, getReview, deleteReview};
