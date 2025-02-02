const express = require("express")
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../Utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");


router.
route("/signup")
.get( (userController.renderRegister))
.post( wrapAsync(userController.signup)
);

router.
route("/login")
.get((req, res) => {
    res.render("users/login.ejs");
})
.post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }),(userController.renderLogin));







router.get("/logout", (userController.logout));

module.exports = router;