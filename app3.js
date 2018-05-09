var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy  = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");
var seedDB = require("./seed");
var methodOverride = require("method-override");
var campgroundRoutes = require("./routes/campground");
var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");



// seedDB();-- Don't not need for this application 

    //SETUP MONGOOSE DATABASE
mongoose.connect("mongodb://localhost/yelp_camp_v5");
    
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
    
app.set("view engine",'ejs');

//===================PASSPORT CONFIGURATION============================
app.use(require("express-session")({
    secret: "Campgrounds are awesome!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware to pass currentUser to all existing routes
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

//===================PASSPORT CONFIGURATION END============================

//=====CONFIGURE ROUTERS FILES==========//
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/",indexRoutes);

//=====CONFIGURE ROUTERS FILES END==========//



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp is running!!!");
    
});