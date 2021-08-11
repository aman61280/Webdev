var express = require("express");
var app = express();
var bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgrounds = [
	    {name: "Salman Creek", image: "https://photosforclass.com/download/px_2398220"},
	    {name: "Granite hills", image: "https://photosforclass.com/download/px_712067"},
	    {name: "Mountain Goat's Rest", image: "https://photosforclass.com/download/px_45241"},
	]

app.get("/", function(req,res){
	res.render("landing");
})

app.get("/campgrounds", function(req,res){
	res.render("campgrounds", {campgrounds:campgrounds});
})

app.get("/campgrounds/new", function(req,res){
	res.render("new");
})

app.post("/campgrounds", function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var newcamp = {name:name, image:image}
	campgrounds.push(newcamp);
	res.redirect("/campgrounds");
})

app.listen(3000, function() {
	console.log("server started");
})