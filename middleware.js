const Listing = require("./models/listing");
const ExpressError = require("./Utils/ExpressError.js");
const { listingSchema,reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be signed in");
        return res.redirect("/login");
    }
    next();
};


module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;

    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing= await Listing.findById(id);  
   if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validatelistings=(req,res,next)=>{
    let{error}=listingSchema.validate(req.boday);
    if(error){
        let errMsg=error.details.map((el)=> el.message).join(",");
        throw new ExpressError(errMsg);
        }
        else{
            next();

        }
    
}

module.exports. validateReview=(req,res,next)=>{
    let{error}=reviewSchema.validate(req.boday);
    if(error){
        let errMsg=error.details.map((el)=> el.message).join(",");
        throw new ExpressError(errMsg);
        }
        else{
            next();

        }
    
};
