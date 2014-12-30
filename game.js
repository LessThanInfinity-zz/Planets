var Game = function(ctx){
  var that = this;

  /* Initialise current bullets. */
  this.bullets = [];
  /* Initialise current Asteroids. */
  this.asteroids = [];
  /* Initialise score. */
  this.totalScore = 0;
  this.scores = [];
  /* Initialise record of ship's parts. */
  this.parts = [];

  /* Create new Ship. */
  this.ship = new Ship(WIDTH/2, HEIGHT/2);
  /* Fill asteroid list with random asteroids. */
  for (var i = 0; i < 20; i++){
    this.asteroids.push(randomAsteroid());
  }
}

// ========================================================
/* Main graphics functions. Draws all objects on screen.*/
// ========================================================
Game.prototype.draw = function (ctx){

  //  Draw the ship. 
  var ship = this.ship;
  if (!ship.isDestroyed)
  {
    ship.draw(ctx, ship.x, ship.y);      
  }

  //  Draw asteroids. 
  for(var i = 0; i < this.asteroids.length; i++){
    var asteroid = this.asteroids[i];
    this.asteroids[i].draw(ctx, asteroid.x, asteroid.y, asteroid.r);
  }

  // Draw bullets. 
  for(var j = 0; j < this.bullets.length; j++){
    var bullet = this.bullets[j];
    this.bullets[j].draw(ctx, bullet.x, bullet.y, bullet.r);
  }

  // Draw scores. 
  for(var k = 0; k < this.scores.length; k++){
    var score = this.scores[k];
    this.scores[k].draw(ctx);
  }

  // Draw Destroyed parts. 
  for(var l = 0; l < this.parts.length; l++){
    var part = this.parts[l];
    this.parts[l].draw(ctx);
  }

  /* Continuity generation of asteroids. */
  if (that.asteroids.length < 20) {
    var randNum = Math.floor(8 + Math.random()*12);
    for (var i = 0; i < randNum; i++){
      that.asteroids.push(randomAsteroid());      
    }
  }

  // Display Score.
  ctx.fillStyle = "white";
  ctx.font = 25 +"pt Courier New";
  ctx.fillText("SCORE: " + this.totalScore,20,40 );
}


// ========================================================
/* Game Kick off. Runs a "loop". */
// ========================================================

Game.prototype.start = function(ctx){
  that = this;
  var loop = setInterval(function(){

    ctx.clearRect(0,0,WIDTH,HEIGHT);
    ctx.fillStyle = "#000000"
    ctx.fillRect(0,0,WIDTH, HEIGHT)

    that.draw(ctx);
    /* This controls the game's end-state, although the game doesn't exactly... "end". */
    if(that.update()){
      clearInterval(loop);
    }
  }, 30);
}

// ========================================================
/* Runs the entire Game. Keeps updating all objects. */
// ========================================================

Game.prototype.update = function(){
  var asteroids = this.asteroids;
  var ship = this.ship;
  var bullets = this.bullets;
  var scores = this.scores;

  // Key Bindings. 
  if  (!that.ship.isDestroyed){
    if (key.isPressed(37)) that.ship.steer(-0.2);
    if (key.isPressed(39)) that.ship.steer(0.2);

    if (key.isPressed(38)){
      that.ship.accelerate();
      that.ship.pedal = true;
    }

    if (!key.isPressed(38) && that.ship.pedal)
    {
    that.ship.pedal = false;
    }

    key('space', function(){
      var newBullet = that.ship.fireBullet();
      if (that.bullets.length < 2){
        if (!that.ship.isDestroyed){
          console.log("fire. BUllets:", that.bullets);
          that.bullets.push(newBullet);        
          }
        }
      }); 
  }

// ========================================================
//                  Ship/Asteroid Update 
// ========================================================

  // New ship position/speed. 
  ship.update(ship.vx, ship.vy);

  for(var i = 0; i < asteroids.length; i++){
    var asteroid = asteroids[i]
    asteroid.update(asteroid.dx,asteroid.dy);

    /* If ship is hit, create parts to float away. */
    if (ship.isHit(asteroid) && !ship.isDestroyed){
      var part1 = new Debris(ship.x + ship.nose[0], ship.y + ship.nose[1], ship.x + ship.leftWing[0], ship.y + ship.leftWing[1]);
      var part2 = new Debris(ship.x + ship.leftWing[0], ship.y + ship.leftWing[1], ship.x + ship.rightWing[0], ship.y + ship.rightWing[1]);
      var part3 = new Debris(ship.x + ship.rightWing[0], ship.y + ship.rightWing[1], ship.x + ship.nose[0], ship.y + ship.nose[1]);
      this.parts = this.parts.concat(part1);
      this.parts = this.parts.concat(part2);
      this.parts = this.parts.concat(part3);
      ship.isDestroyed = true;
    }

    asteroid.offScreen();
  }

// ========================================================
//                    Debris Update 
// ========================================================

for (var i = 0; i < this.parts.length; i++){
  var part = this.parts[i];
  part.update(part.dx, part.dy);
}

// ========================================================
//                    Bullet Update 
// ========================================================
  
  for (var i = 0; i < bullets.length; i++){
    var bullet = bullets[i];
    if (!bullet.done)
    {
      bullet.update(bullet.vx, bullet.vy);      
    }

    /* Should an asteroid be hit, make more asteroids. */
    var newAsteroids = [];
    for (var j = 0; j < asteroids.length; j++){

      if (bullet.isHit(asteroids[j]) ){
        bullet.done = true;
        bullets.splice(i, 1);
        /* Show/Update points. */
        var currPoints = 1000;
        var scoreToAdd = new Score(bullet.x, bullet.y, currPoints);
        this.scores = scores.concat(scoreToAdd);
        this.totalScore += currPoints;

        /* Update Asteroids. */
        this.asteroids = asteroids.concat(asteroids[j].explode());
        this.asteroids.splice(j,1);
        
        bullets.splice(i,1);
        console.log(bullets);
      }
    }

        // Remove bullet if offscreen. 
    if (!bullet.done && bullet.offScreen()){
      bullets.splice(i, 1);
    }
  }

// ========================================================
//                    Scores Section 
// ========================================================
for (var i = 0; i < scores.length; i++){
  var score = scores[i];
  score.update(score.dx, score.dy);
  if (score.doneDisplaying)
  {
      scores.splice(i, 1);
  }
}


// If ship's offscreen, reset.
  ship.offScreen();
  return false;
}