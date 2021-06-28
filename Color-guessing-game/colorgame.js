 var num = 6;
 var colors = randomcolorgenerator(num);
 var h1 = document.querySelector("h1");
 var message  = document.querySelector("#message");
 var pickedcolor = pickcolor();
 var colordisplay = document.querySelector("#colordisplay");
 var resetbutton = document.querySelector("#reset");
 var easy = document.querySelector("#easy");
 var hard = document.querySelector("#hard");

 easy.addEventListener("click",function(){
 	num =  3
 	colors = randomcolorgenerator(num);
 	pickedcolor = pickcolor();
 	colordisplay.textContent = pickedcolor;
 	easy.classList.add("selected");
 	hard.classList.remove("selected");
 	for (var i = 0; i < squares.length; i++) {
 		if(colors[i])
 			squares[i].style.background = colors[i];
 		else
 			squares[i].style.display = "none";
 	}
 	resetbutton.textContent = "New Color";
 	h1.style.background = "steelblue";
 	message.textContent = "";
 })

 hard.addEventListener("click",function(){
 	num = 6;
 	colors = randomcolorgenerator(num);
 	pickedcolor = pickcolor();
 	colordisplay.textContent = pickedcolor;
 	hard.classList.add("selected");
 	easy.classList.remove("selected")

 	for (var i = 0; i < squares.length; i++) {
 	 squares[i].style.background = colors[i];
 	 squares[i].style.display = "block";
 	}
 	resetbutton.textContent = "New Color";
 	h1.style.background = "steelblue";
 	message.textContent = "";
 })


resetbutton.addEventListener("click",function(){
	// if(easy.style.background == "blue")
	// 	colors = randomcolorgenerator(3);
	// else
	colors = randomcolorgenerator(num);
	pickedcolor = pickcolor();
	colordisplay.textContent = pickedcolor;
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background = colors[i];
	}
	resetbutton.textContent = "New Color";
	h1.style.background = "steelblue";
	message.textContent = "";

})
 colordisplay.textContent = pickedcolor;
 var squares = document.querySelectorAll(".square");
 for (var i = 0; i <squares.length; i++) {
 	  squares[i].style.background = colors[i];
 	  squares[i].addEventListener("click", function() {
 	  	if(this.style.background === pickedcolor){
 	  		message.textContent = "correct";
 	  		colorchange(pickedcolor);
 	  		h1.style.background = pickedcolor;
 	  		resetbutton.textContent = "Play Again";
 	  	}
 	  	else{
 	  		this.style.background = "#232323";
 	  		message.textContent = "Try Again";
 	  	}
 	  })
 }
 function colorchange(color) {
 	for(var i = 0;i<squares.length;i++){
 		squares[i].style.background = color;
 	}
 }
 function pickcolor(){
 		var random = Math.floor(Math.random()*colors.length);
 		return colors[random];
 }
function randomcolorgenerator(num){
	var arr = [];
	for (var i = 0; i < num; i++) {
		arr.push(randomcolor());

	}
	return arr;
}

function randomcolor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")"
	} 
