var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var step = function (){
    context.clearRect(0, 0, canvas.width, canvas.height);
    render();
    animate(step);
}

var animate = window.requestAnimationFrame ||
              function(step) { window.setTimeout(step, 1000/60) };

var player = new Player('joe');
var computer = new Computer();
var ball = new Ball();

function Paddle(type){
  if (type == "computer"){
    this.x = 0;
    this.y = 0;
    this.width = 10;
    this.height = 100;
    this.speed = 10; //pixels per press
  }
  else {
   this.x = 568;
   this.y = 0;
   this.width = 10;
   this.height = 100;
   this.speed = 10;
  }
}

function Ball(){
  this.x = canvas.width / 2;
  this.y = canvas.height / 2;
  this.radius = 10;
  this.startAngle = 0;
  this.endAngle = 2 * Math.PI;
  this.counterClockwise = false;

}

function Player(name){
  this.name = name;
  this.paddle = new Paddle('player');
  this.context = context;
}

function Computer(){
  this.paddle = new Paddle('computer');
}

function render(){
  player.render();
  computer.render();
  ball.render();

}


Paddle.prototype.render = function(){
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height)
    context.fillStyle = 'black';
    context.fill();
    context.stroke();

};
Player.prototype.render = function(){
    this.paddle.render();
};
Computer.prototype.render = function(){
    this.paddle.render();
};

Ball.prototype.render = function(){
  context.beginPath();
  context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.counterClockwise);
  context.fillStyle = 'blue';
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = '#003300';
  context.stroke();
};

Paddle.prototype.move = function(direction){
  if (direction === 0){
    this.y -= 10
  }
  else{
    this.y += 10
  }

};

window.onload = function(){
   animate(step);
 }

window.addEventListener('keydown', function(event){
  var key =  event.keyCode;
  if (key === 38 ){
    if(player.paddle.y != 0){
      player.paddle.move(0);
    }
  }
  else if (key === 40){
    if (player.paddle.y != 100){
    player.paddle.move(1)
  }
}

});
