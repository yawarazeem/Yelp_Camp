

//***************************
//Auth Routes
//***************************

//show register form
var express = require("express");
var router  = express.Router();
var User    = require("../models/user");
var passport = require("passport");


router.get("/register", function(req, res){
    res.render("../Views/register");
});

//handle signIn logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    if(req.body.adminCode === 'secret_Code'){
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            // console.log(err)  if we want to see what type data is being returned
             req.flash("error", err.message );
             return res.render("../Views/register");
        }
        passport.authenticate("local")(req, res, function(){
           console.log(user);
            req.flash("success", "Welcome " + user.username );
            res.redirect("../Views/campgrounds/index");
        });
           
        
    });
});
//show login form
router.get("/login", function(req, res){
    res.render("../Views/login");
});
//handling login logic
router.post("/login", passport.authenticate("local",{
    successRedirect: "campgrounds",
    failureRedirect: "../Views/login"
}), function(req, res){

});

//logout logic
router.get("/logout", function(req,  res){
    req.logout();
    req.flash("success", "Logged You Out");
    res.redirect("../Views/campgrounds");
});



module.exports = router;