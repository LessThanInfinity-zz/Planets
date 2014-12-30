var Score = function(startX, startY, points){
	MovingObject.apply(this, [startX, startY]);
	this.points = points;
	this.dx = 0;
	this.dy = -10;

	this.path = 0;
	this.doneDisplaying = false;
}

Score.prototype = new F(); // Surrogate F() defined in asteroid.js.

/* Output score. */
Score.prototype.draw = function(ctx){
	ctx.fillStyle = "yellow";
	ctx.font = "bold" + 5 + "pt Courier New";
	ctx.fillText("+" +this.points, this.x, this.y) 
}

// Call superclass function if time. For now, redefined function.
Score.prototype.update = function(dx,dy){
	this.x += dx;
	this.y += dy;
	if (this.path <= 15) {
		this.path += 1;
	} else {
		this.doneDisplaying = true;
	}
}
