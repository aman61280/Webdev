var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyparser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var CampgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", CampgroundSchema);

// Campground.create(
// 	{
// 		name: "Granite hills", 
// 		image: "https://photosforclass.com/download/px_712067",
//         description: "This is a huge granite hill"
// 	},
// 	function(err, Campground){
// 		if(err){
// 			console.log(err);
// 		}
// 		else{
// 			console.log("NEWLY CREATED CAMPGROUND");
// 			console.log(Campground);
// 		}
// 	}
// );



app.get("/", function(req,res){
	res.render("landing");
})

app.get("/campgrounds", function(req,res){
	Campground.find({},function(err, allCampground){
		if(err){
			console.log(err)
		}
		else{
			res.render("index", {campgrounds: allCampground});
		}
	})
	
})

app.get("/campgrounds/new", function(req,res){
	res.render("new");
})

app.post("/campgrounds", function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var desc  = req.body.description;
	var newcamp = {name:name, image:image, description:desc}
	Campground.create(newcamp, function(err, allCampground){
		if(err){
			console.log(err)
		}
		else{
			res.redirect("/campgrounds");
		}
	})
})

app.get("/campgrounds/:id", function(req,res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		}
		else{
			res.render("show", {Campground: foundCampground});
		}

	});
	
});

app.listen(3000, function() {
	console.log("server started");
})