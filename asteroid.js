
var Asteroid = function(startX, startY){
  // Call MovingObject's constructor. 
  MovingObject.apply(this, [startX, startY]);
  this.r = 40 + Math.random() * 50;
  this.dx = -2 + (Math.random() * 4);
  this.dy = -2 + (Math.random() * 4);
}

/* F = surrogate. Only exists to facilitate inheritance. */
function F(){}
F.prototype = MovingObject.prototype;
Asteroid.prototype = new F();

/* Randomises a start position + spawns asteroid at this position. */
var randomAsteroid = function(){

  var walls = ['left','right', 'top','bottom'];
  // chooses random wall to spawn asteroid from.
  var sample = walls[Math.floor((Math.random()*4)/1)];

  switch (sample){
  case "left":
    var startX = 0;
    var startY = Math.random() * HEIGHT;
    break;
  case "right":
    var startX = WIDTH;
    var startY = Math.random() * HEIGHT;
    break;
  case "top":
    var startX = Math.random() * WIDTH;
    var startY = 0;
    break;
  case "bottom":
    var startX = Math.random() * WIDTH;
    var startY = HEIGHT;
    break;
    }

  asteroid = new Asteroid(startX, startY);
  return asteroid;
}

/* Draw function to visualise asteroid. */
Asteroid.prototype.draw = function(ctx, x, y, r){
// Note: Decipher how to create random shapes.(currently circular)
  ctx.beginPath();
  // Circulat atm, change to random. 
  ctx.arc(x,y,r,0, Math.PI*2,true);

  // Stroke with White borders.
  ctx.strokeStyle = "#ffffff"; // White. 
  ctx.lineWidth = 4;
  ctx.stroke();
  
  // Fill with Black. 
  ctx.fillStyle = "#000000";
  ctx.fill();

  ctx.closePath();
}

/*For when asteroid collides. Spawns random number of mini asteroids. 
*/
Asteroid.prototype.explode = function(){

  var spawns = 2 + Math.floor(Math.random() * 4);

  // Record new asteroids.
  var newAsteroids = [];

  for(var i=0; i < spawns; i++){
    var newAsteroid = new Asteroid(this.x, this.y);
    newAsteroid.r = Math.floor(Math.random() * (0.5* this.r));
    if(newAsteroid.r > 6){
      newAsteroids.push(newAsteroid);
    }
  }

  return newAsteroids;
}