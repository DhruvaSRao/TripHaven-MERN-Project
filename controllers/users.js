const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs")
};

module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to TripHaven");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }};

module.exports.renderLoginForm = async (req, res) => {
    res.render("users/login.ejs")};

module.exports.login = async(req, res) => {
        req.flash("success", "Welcome to TripHaven! You are logged in!");

        // use the saved URL if present, otherwise fallback
        const redirectUrl = res.locals.redirectUrl || "/listings";

        // clear it after using so it doesn’t persist

        res.redirect(redirectUrl);
    }

module.exports.logout = async(req,res, next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    })};