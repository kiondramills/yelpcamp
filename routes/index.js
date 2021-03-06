var express = require("express");
var router  = express.Router();
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var User = require("../models/user");
var passport = require("passport");
var LocalStrategy  = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
//=============================
//AUTHENTICATION ROUTES
//=============================

//Define Routes for campgrounds
router.get("/", function(req, res){
    res.render("landing");
});

//REGISTER ROUTES
router.get("/register", function(req, res){
   res.render("register"); 
});

//REGISTERATION POST ROUTE
router.post("/register", function(req, res){
 
   
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
      if(err){
          console.log(err);
          return res.render("register");
      }
      passport.authenticate("local")(req, res, function(){
          res.redirect("/campgrounds");
      });
      
    }); 
      
       
});     


//LOGIN ROUTES
router.get("/login", function(req, res){
   res.render("login"); 
});

//LOGIN POST ROUTE
//Example app.post("/route", middleware, callback)
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
    }), function(req, res){
});

//LOGOUT ROUTE
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/campgrounds");
});



//===============MIDDLEWARE =================//

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    
    res.redirect("/login");
}

module.exports = router;