var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var User = require("../models/user");
var passport = require("passport");
var LocalStrategy  = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

//===============COMMENTS ROUTES=================//
router.get("/new", isLoggedIn, function(req, res){
     //find campground by ID 
     Campground.findById(req.params.id, function(err, campgroundFound){
         if(err){
             console.log(err);
         } else{
              res.render("comments/new", {campground: campgroundFound});
         }
     });
   
});

router.post("/", function(req, res){
    //lookup campgrounds by ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else{
            
             //create new comments
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    //connect new comment to campground ID
                    campground.comments.push(comment);
                    campground.save();
                    comment.save();
                     //redirect to show page
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
   
    
});


//===============MIDDLEWARE =================//

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    
    res.redirect("/login");
}



module.exports = router;