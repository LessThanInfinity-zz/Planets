/* Classes defined: Ship, Debris . 
    SubClass of : MovingObject. */

var Ship = function(startX, startY){
  MovingObject.apply(this,[startX, startY]);
  this.r = 25;
  // Velocity.
  this.vx = 0;
  this.vy = -.5;
  this.angle = 0.00;

  this.nose = [0,-(this.r)];
  this.leftWing = [0-(this.r/2), this.r*Math.sqrt(3)/2];
  this.rightWing = [(this.r/2), this.r*Math.sqrt(3)/2];
  this.tail = [0,this.r+this.r/3];

  // Game Check booleans.
  this.pedal = false;
  this.isDestroyed = false;
}

Ship.prototype = new F();// Surrogate F() defined in asteroid.js

Ship.prototype.draw = function(ctx,x,y){
  ctx.beginPath();
  ctx.arc(x, y, this.r,0, Math.PI*2, true);
  ctx.fillStyle = "#000000"; //Black
  ctx.fill();
  ctx.closePath();

  var r = this.r;

  //  Update Nose  co-ods
  var nose = [0, -r];
  var noseX = nose[0]*Math.cos(this.angle) - nose[1]*Math.sin(this.angle);
  var noseY = nose[0]*Math.sin(this.angle) + nose[1]*Math.cos(this.angle);
  this.nose = [noseX, noseY];

  //  Update Left Wing co-ods
  var leftWing = [0-(r/2), r*Math.sqrt(3)/2];
  var leftWingX = leftWing[0]*Math.cos(this.angle) - leftWing[1]*Math.sin(this.angle);
  var leftWingY = leftWing[0]*Math.sin(this.angle) + leftWing[1]*Math.cos(this.angle);
  this.leftWing = [leftWingX, leftWingY];

  //  Update Right Wing co-ods
  var rightWing = [(r/2), r*Math.sqrt(3)/2];
  var rightWingX = rightWing[0]*Math.cos(this.angle) - rightWing[1]*Math.sin(this.angle);
  var rightWingY = rightWing[0]*Math.sin(this.angle) + rightWing[1]*Math.cos(this.angle);
  this.rightWing = [rightWingX, rightWingY];

  /* Update legs. */
  var leftLeg = [0-((r+15)/2), (r+15)*Math.sqrt(3)/2];
  var rightLeg = [((r+15)/2), (r+15)*Math.sqrt(3)/2];

  var leftLegX = leftLeg[0]*Math.cos(this.angle) - leftLeg[1]*Math.sin(this.angle);
  var leftLegY = leftLeg[0]*Math.sin(this.angle) + leftLeg[1]*Math.cos(this.angle);
  var rightLegX = rightLeg[0]*Math.cos(this.angle) - rightLeg[1]*Math.sin(this.angle);
  var rightLegY = rightLeg[0]*Math.sin(this.angle) + rightLeg[1]*Math.cos(this.angle);



/* Draw the Ship. 
 Outline Ship: Move to Nose, then nose-leftWing-rightWing-Nose. */
  ctx.beginPath();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1.5;

  ctx.moveTo(x + this.nose[0], y + this.nose[1]);

  ctx.lineTo(x + this.leftWing[0], y + this.leftWing[1]);
  ctx.lineTo(x + leftLegX, y + leftLegY);
  ctx.moveTo(x + this.leftWing[0], y + this.leftWing[1]);

  ctx.lineTo(x + this.rightWing[0],y + this.rightWing[1]);
  ctx.lineTo(x + rightLegX, y + rightLegY);
  ctx.moveTo(x + this.rightWing[0], y + this.rightWing[1]);  

  ctx.lineTo(x + this.nose[0], y + this.nose[1])
  ctx.stroke();
  ctx.closePath();

  // Update ignition Tail. 
  var tail = [0,r+r/2];
  var tailX = tail[0]*Math.cos(this.angle) - tail[1]*Math.sin(this.angle);
  var tailY = tail[0]*Math.sin(this.angle) + tail[1]*Math.cos(this.angle);
  this.tail = [tailX,tailY];

  /* Draw Ignition tail. */
  if (this.pedal)
  {
    ctx.beginPath();
    var blackOrWhite = Math.floor(Math.random()*12)
    if (blackOrWhite <= 3)
    {
      blackOrWhite = "#000000";
    } else {
      blackOrWhite = "#ffffff";
    }
      // var strokes = ["#ffffff", "F8F539", "F89239","F83939", "#000000"];
    ctx.strokeStyle = blackOrWhite; // strokes[Math.floor(Math.random() * strokes.length)];
    ctx.moveTo(x+ this.leftWing[0], y+ this.leftWing[1]);
    ctx.lineTo(x + tailX, y+ tailY);
    ctx.lineTo(x + this.rightWing[0], y+ this.rightWing[1]);
      ctx.stroke();
    ctx.closePath();
  }
}

Ship.prototype.accelerate = function(){
  this.vx += 0.2*Math.sin(this.angle);
  // Prevent ship from reaching light speed. 
  if (this.vx > 10){
    this.vx = 10;
  } else if (this.vx < -10){
    this.vx = -10;
  }

  // Prevent ship from reaching light speed. 
  this.vy += -0.2*Math.cos(this.angle);
  if (this.vy > 10){
    this.vy = 10;
  } else if (this.vy < -10){
    this.vy = -10;
  }
}


Ship.prototype.decelerate = function(){
  this.vx -= 0.2*Math.sin(this.angle);

  // Prevent ship from reaching light speed. 
  if (this.vx > 10){
    this.vx = 10;
   } 

  this.vy -= -0.2*Math.cos(this.angle);
  if (this.vy > 10){
    this.vy = 10;
  } 
}


Ship.prototype.steer = function(dAngle){
  this.angle += dAngle;
}

Ship.prototype.fireBullet= function(){
  var bullet = new Bullet(this.x + this.nose[0], this.y + this.nose[1], this.angle);
  return bullet;
}

//---------After the Ship explodes---------------

var Debris = function(startX, startY, endX, endY){
  MovingObject.apply(this, [startX, startY]);
  this.endX = endX;
  this.endY = endY;

  this.dx = -2 + (Math.random() * 4);
  this.dy = -2 + (Math.random() * 4);

}

Debris.prototype = new F(); // Surrogate F defined in Asteroid.js

Debris.prototype.draw = function(ctx){
  ctx.beginPath();

  ctx.strokeStyle = "pink";

  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.endX,this.endY);
  ctx.stroke();
  ctx.closePath();
}

Debris.prototype.update = function(dx, dy){
  this.x += dx;
  this.y += dy;
  this.endX += dx;
  this.endY += dy;
}