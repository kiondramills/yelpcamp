var express = require("express");
var router  = express.Router({mergerparams:true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var passport = require("passport");
var LocalStrategy  = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

//INITIALIZE ALL ROUTES RELATED TO CAMPGROUNDS

//=======INDEX ROUTE======/
//shows all campgrounds
router.get("/", function(req, res){
   //get all campgrounds
   Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log("Error in getting all campgrounds!");
           console.log(err);
       } else{
        res.render("campgrounds/index", {campgrounds:allCampgrounds});   
       }
   });
});

//route to form page to add a new campground.

//=======NEW ROUTE======/
//displays form to make new entry to DB.
router.get("/new", isLoggedIn, function(req, res){
   res.render("campgrounds/new.ejs"); 
});


//=======CREATE ROUTE======/
//adds new campground to DB
router.post("/", function(req, res){
    //get data from form & add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var description =req.body.description;
    var newCampground = {name: name, image:image, description: description, author: author};
    
    // Instead of pushing new camground in default array: campgrounds.push(newCampground);
 
    // Create new campground in database
  Campground.create(newCampground, function(err, newlyCampground){
      if(err){
          console.log("Can't create new campground");
          console.log(err);
      } else{
          res.redirect("/campgrounds"); //if successful redirect back to all campgrounds
      }
  });
    
});

//=======SHOW ROUTE======/
router.get("/:id", function(req, res){
   
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
           console.log("Sorry can't find");
       } else{
           console.log(foundCampground);
           res.render("campgrounds/show", {campground:foundCampground});
       }
   });

});

//=====EDIT ROUTE=====//
router.get("/:id/edit", checkCampgroundOwnership, function(req, res){
    //Checks to see if user logged in & is user the owner?
                Campground.findById(req.params.id, function(err, foundCampground){
                     res.render("campgrounds/edit", {campground:foundCampground}); //redirect, if user doesnt own campground
                });
});

//=====UPDATE ROUTE=====//
router.put("/:id", checkCampgroundOwnership, function(req, res){

     Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
           if(err){
               console.log("opps!");
               res.redirect("/campgrounds");
           } else{
               console.log("YEAH!!!!")
               res.redirect("/campgrounds/" + req.params.id);
           }
   });

});

//=====DESTROY ROUTE=====//
router.delete("/:id", isLoggedIn, checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       } else{
            res.redirect("/campgrounds");
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

function checkCampgroundOwnership(req, res, next){
    //is user logged in
    if(req.isAuthenticated()){
        //is user the owner?
                Campground.findById(req.params.id, function(err, foundCampground){
                    if(err){
                        res.redirect("back");
                    } else{
                        //is user the owner?
                            if(foundCampground.author.id.equals(req.user._id)){
                                next();
                            }
                            else{
                                   res.redirect("back");
                            }
                        }  //redirect to previous page, if user doesnt own campground
                    });
                    
                    
                }
    else{
        res.redirect("/login");  //redirect, if not logged in
    }
}


module.exports = router;