const express=require("express")
const router=express.Router({mergeParams:true});
const wrapAsync = require("../Utils/wrapAsync.js");
const ExpressError = require("../Utils/ExpressError.js");
const review = require("../models/review.js");

const Listing = require("../models/listing.js");
const{validateReview, isLoggedIn}=require("../middleware.js");
const reviewController = require("../controllers/reviews.js");




//reviews
//post route
router.post("/",isLoggedIn, validateReview,wrapAsync (reviewController.createReview));
 
 
 //delete review route
 
 router.delete("/:reviewId",wrapAsync(reviewController.deleteReview));


 module.exports=router;