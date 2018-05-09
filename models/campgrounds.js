var mongoose = require("mongoose");


//SETUP CAMPGROUNDS SCHEMA
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

//SETUP MODEL

module.exports = mongoose.model("Campground", campgroundSchema);
