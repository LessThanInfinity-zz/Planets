var WIDTH;
var HEIGHT;

var Asteroids = function(){
  var elem = document.getElementById('canvas');
  var ctx = elem.getContext('2d');

  WIDTH = 1250//elem.width();
  HEIGHT = 600//elem.height();

	  this.game = new Game(ctx);
	  this.game.start(ctx);
}
