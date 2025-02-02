const express=require("express")
const router=express.Router();
const wrapAsync = require("../Utils/wrapAsync.js");


const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner ,validatelistings} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});  

router
.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn, validatelistings,
    // upload.single('listing[image]'),
   
       wrapAsync( listingController.createListing));






// new route
router.get("/new", isLoggedIn,(listingController.renderNewForm) );


//show route

router.get("/:id",
    wrapAsync( listingController.showListing));







//Edit Route
router.get("/:id/edit", isLoggedIn,isOwner,
    wrapAsync( listingController.renderEditForm));


//Update Route

router.put("/:id",isLoggedIn,isOwner, validatelistings, wrapAsync( listingController.updateListing
   ));

//Delete Route

router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));


  module.exports=router;