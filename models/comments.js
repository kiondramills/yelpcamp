
var mongoose = require("mongoose");

//SETUP CAMPGROUNDS SCHEMA

var commentSchema = mongoose.Schema({
   text: String,
   author:{
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});


//SETUP MODEL

module.exports = mongoose.model("Comment", commentSchema);

