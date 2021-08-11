var express               = require("express"),
    app                   = express(),
    bodyparser            = require("body-parser"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    Campground            = require("./models/campground"),
    Comment               = require("./models/comment"),
    User                  = require("./models/user"),
    seedDB                =require("./seeds");


seedDB();
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Rusty is the best and cutest dog in the world",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});



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
			res.render("campgrounds/index", {campgrounds:allCampground, currentUser:req.user});
		}
	});
	
});

app.get("/campgrounds/new", isLoggedIn, function(req,res){
	res.render("campgrounds/new");
})

app.post("/campgrounds", isLoggedIn, function(req,res){
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
			res.render("campgrounds/show", {Campground: foundCampground});
		}

	});
	
});

//=================
//COMMENTS ROUTES
//=================

app.get("/campgrounds/:id/comments/new",isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new", {campground: campground});
		}
	});
});

app.post("/campgrounds/:id/comments",isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else{
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id);
				}
			})
		}
	})
})

//======================
//AUTH ROUTES
//======================

app.get("/register", function(req, res){
	res.render("register");
});

//handling user sig up
app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render("/register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});

//LOGIN ROUTES
//render login form
app.get("/login", function(req, res){
	res.render("login");
})

//LOGIN LOGIC
//middleware
app.post("/login",passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
	}), function(req,res){
});

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
})

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

app.listen(3000, function() {
	console.log("server started");
});