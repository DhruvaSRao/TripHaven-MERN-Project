const Listing = require("./models/listing");
const Review = require("./models/review");
module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl; // To redirect the user the to page where he wanted to go but was asked to sign up or login.
        req.flash("error", "You must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
} 

//Since once redirected to any page after login and he goes to next page the previous page info will be refreshed, to avoid this we store the result in locals which won't get refreshed.
module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You don't have permission to edit!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};


module.exports.isReviewAuthor = async (req, res, next) => {
    let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the author of this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};