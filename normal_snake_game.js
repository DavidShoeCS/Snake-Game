var snake;
var scl = 20;
var food;

function Snake(){
	this.x = 0;
	this.y = 0;
	this.xspeed = 1;
	this.yspeed = 0;
	this.length = 0;
	this.tail = [];

	this.eat = function(pos){
		var d = dist(this.x, this.y, pos.x, pos.y);
		if(d < 1){
			this.length++;
			return true;
		}
		else{
			return false;
		}
	}

	this.dir = function(x,y){
		this.xspeed = x;
		this.yspeed = y;

	}

	this.death = function(){
		for(var i = 0; i < this.tail.length; i++){
			var pos = this.tail[i];
			var d = dist(this.x, this.y, pos.x, pos.y);
			if(d<1){
				this.length = 0;
				this.tail =[];
			}
		}
	}

	this.update = function(){
		for(var i = 0; i < this.tail.length-1; i++){
			this.tail[i] = this.tail[i+1];
		}
		if(this.length >= this.tail.length){
			this.tail[this.length-1] = createVector(this.x, this.y);
		}

		this.x = this.x + this.xspeed*scl;
		this.y = this.y + this.yspeed*scl;

		this.x = constrain(this.x, 0, width-scl);
		this.y = constrain(this.y, 0, height-scl);
	}

	this.show = function(){

		fill(0,255,0);
		for(var i = 0; i < this.tail.length; i++){
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}
		
		rect(this.x, this.y, scl, scl);
	}

}

function pickLocation(){
	var cols = floor(width/scl);
	var rows = floor(height/scl);
	food = createVector(floor(random(cols)), floor(random(rows)));
	food.mult(scl);
}



function setup(){
	createCanvas(600,600);
	snake = new Snake();
	frameRate(12);
	pickLocation();
}






function draw(){
	background(50); 

	if(snake.eat(food)){
		pickLocation();
	}
	snake.death();
	snake.update();
	snake.show();

	console.log(snake.tail)

	fill(255,0,100);
	rect(food.x, food.y, scl, scl);


}

function keyPressed(){
	if(keyCode === UP_ARROW){
		snake.dir(0,-1);
	}
	else if(keyCode === DOWN_ARROW){
		snake.dir(0,1);
	}
	else if(keyCode === RIGHT_ARROW){
		snake.dir(1,0);
	}
	else if(keyCode === LEFT_ARROW){
		snake.dir(-1,0);
	}

}


