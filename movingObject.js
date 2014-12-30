/* Constructor - beginning position. */
var MovingObject = function(startX, startY){
  this.x = startX;
  this.y = startY;
}

/* Changes position acc to dx/dy */
MovingObject.prototype.update = function(dx, dy){
  this.x += dx;
  this.y += dy;
}

/* Resets moving object's postion if it goes offscreen. 
   *** Note: (0,0) is at the upper left corner of the screen, with no negative 
   positions */

MovingObject.prototype.offScreen = function(){

  // Left to right
  if (this.x < 0){
    this.x = WIDTH;
  }

  // Right to Left
  else if (this.x > WIDTH){
    this.x = 0;
  }

  // Top to bottom
  else if (this.y < 0){
    this.y = HEIGHT;
  }

  // Bottom to top
  else if (this.y > HEIGHT){
    this.y = 0;
  }
}

/* Collision detection. */
MovingObject.prototype.isHit = function(object){
  var deltaX = this.x - object.x;
  var deltaY = this.y - object.y;
  var distance = (Math.sqrt(Math.pow(deltaX, 2) + (Math.pow(deltaY, 2))));

  if (distance < (this.r + object.r)){
    return true;
  }
}
