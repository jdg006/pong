var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

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
 window.onload = function(){
   render();
 }

Paddle.prototype.render = function(){
    context.rect(this.x, this.y, this.width, this.height)
    context.fillStyle = 'black';
    context.fill();

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
