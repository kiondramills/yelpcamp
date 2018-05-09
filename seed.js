var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");

var data = [
    {
        name: "Kathy's Camp",
        image: "http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
     {
        name: "Damoan Lake",
        image: "http://camprrm.com/wp-content/uploads/2011/06/whiteface1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    
    {
        name: "Jayden's Cave",
        image: "http://camprrm.com/wp-content/uploads/2012/02/widewaters-campground-1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
];


function seedDB(){
    
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("Campgrounds removed!!!");
        }
    
      data.forEach(function(seed){
        //All initial campgrounds
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            } else{
                console.log("added campgrounds!!!");
        
                Comment.create(
                    {
                        text: "This is my favorite place!", 
                        author: "Dk.Mills"
                        
                    }, function(err, comment){
                        if(err){

                            console.log(err);
                        } else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Thanks, Comment Added!!!!");
                        }
                    });  
                }
        });
      });
    });
}
    //Add comments
module.exports = seedDB;