var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");

//INDEX - Show all campgrounds
router.get("/", function(req,res){
	//Get all campgrounds from db
	Campground.find({},function(err, allCampground){
		if(err){
			console.log(err)
		}
		else{
			res.render("campgrounds/index", {campgrounds:allCampground, currentUser:req.user});
		}
	});
	
});


//create - add new campground to DB
router.post("/", isLoggedIn, function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var desc  = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newcamp = {name:name, image:image, description:desc, author:author}
	Campground.create(newcamp, function(err, newlyCreated){
		if(err){
			console.log(err)
		}
		else{
			res.redirect("/campgrounds");
		}
	});
});

//NEW -  show form to create a new campground
router.get("/new", isLoggedIn, function(req,res){
	res.render("campgrounds/new");
})

//SHOW -  shows more info about one campground
router.get("/:id", function(req,res){
	//find all campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}
		else{
			console.log(foundCampground);
			res.render("campgrounds/show", {Campground: foundCampground});
		}

	});
	
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;