
var Bullet = function(startX, startY, angle){
  // Subclass of MovingObject. 
  MovingObject.apply(this,[startX, startY]);
  this.r = 3;
  this.speed = 15;
  this.angle = angle;
  this.vx = this.speed * Math.sin(this.angle);
  this.vy = this.speed * -Math.cos(this.angle);
  this.done = false;

}

Bullet.prototype = new F(); // Surrogate F() defined in asteroid.js

/* Bool check: Is bullet offscreen? */
Bullet.prototype.offScreen = function(){
    if (this.x < 0 || this.x > WIDTH || this.y < 0 || this.y > HEIGHT) {
      return true;
    } else {
      return false;
    }
}

/* Circular bullets. */
Bullet.prototype.draw = function (ctx){
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r,0, Math.PI*2, true);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.closePath();
}
