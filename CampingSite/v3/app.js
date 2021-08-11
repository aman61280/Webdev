var express    = require("express"),
    app        = express(),
    bodyparser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB     =require("./seeds");


seedDB();
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");



app.get("/", function(req,res){
	res.render("landing");
})

//INDEX - Show all campgrounds
app.get("/campgrounds", function(req,res){
	Campground.find({},function(err, allCampground){
		if(err){
			console.log(err)
		}
		else{
			res.render("index", {campgrounds: allCampground});
		}
	});
	
});

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

//SHOW -  shows more info about one campground
app.get("/campgrounds/:id", function(req,res){
	//find all campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}
		else{
			console.log(foundCampground);
			res.render("show", {Campground: foundCampground});
		}

	});
	
});

app.listen(3000, function() {
	console.log("server started");
})