var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

var data = [
    {
    	name: "Cloud'Rest",
        image: "https://photosforclass.com/download/px_712067",
        description: "blah blah blah"
    },
    {
    	name: "Cloud'Rest",
        image: "https://photosforclass.com/download/px_712067",
        description: "blah blah blah"
    },
    {
    	name: "Cloud'Rest",
        image: "https://photosforclass.com/download/px_712067",
        description: "blah blah blah"
    }
]


function seedDB(){
	//Remove all campgrounds
	Campground.remove({}, function(err){
	if(err){
		console.log("err");
	}
	console.log("removed Campground");
	//add a few campgrounds
	data.forEach(function(seed){
		Campground.create(seed, function(err, campground){
			if(err){
				console.log(err);
			}
			else{
				console.log("added a campground");
				//create a comment
				Comment.create(
				    {
					    text: "This place is great, but i wish there was internet",
					    author: "Homer"
				    }, function(err, comment){
				    	if(err){
				    		console.log(err);
				    	}
				    	else{
				    		campground.comments.push(comment);
				    	    campground.save();
				    	    console.log("created new comment");
				    	}
				    });
			}
		});
	});
});
	
}

module.exports = seedDB;
