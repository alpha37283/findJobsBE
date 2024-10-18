const express = require('express');
const routerReviews = express.Router();

const {postReview, getReview, deleteReview} = require('../controller/reviews.controller.js');


// Reviews Routes
//    POST /reviews: Submit a review for a completed service.
//    GET /reviews/:sellerId: Fetch reviews for a specific seller.
//    DELETE /reviews/:id: Remove a review.

routerReviews.post('/post',postReview);
routerReviews.get('/:id',getReview);
routerReviews.delete('/:id',deleteReview);


module.exports = routerReviews;