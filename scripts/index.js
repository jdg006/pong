var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var player = new Player('Joe');
var computer = new Computer();
var ball = new Ball();

var animate = window.requestAnimationFrame ||
              function(step) { window.setTimeout(step, 1000/60)};

var step = function (){
    score();
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.move();
    computer.ai();
    render();
    if (player.score != 11 && computer.score != 11){animate(step);}
    else if(player.score == 11){
      $('.landing').html("<h1> You Won</h1>" + "<h2>Refresh Page To Play Again</h2>");

    }
    else if(computer.score == 11){
      $('.landing').html("<h1>Game Over. You Lost</h1>" + "<h2>Refresh Page To Play Again</h2>");
    }

}

function Paddle(type){
  if (type == "computer"){
    this.width = canvas.width/57.8;
    this.height = canvas.height/3;
    this.x = 0;
    this.y = (canvas.height/2) - (this.height/2);

    this.speed = this.width/9; //pixels per callback
  }
  else {
   this.width = canvas.width/57.8;
   this.height = canvas.height/3;
   this.x = (canvas.width-this.width);
   this.y = (canvas.height/2) - (this.height/2);
   this.speed = this.width;
  }
}

function Ball(){
  this.x = canvas.width / 2;
  this.y = canvas.height / 2;
  this.radius = canvas.height/20;
  this.startAngle = 0;
  this.endAngle = 2 * Math.PI;
  this.counterClockwise = false;
  this.speed = 1.6; //pixels per callback
  this.direction = "++";

}

function Player(name){
  this.name = name;
  this.paddle = new Paddle('player');
  this.score = 0;

}

function Computer(){
  this.paddle = new Paddle('computer');
  this.score = 0;
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


function score (){
  $('.score').html('<p>'+"Computer: " + computer.score + '  &nbsp; &nbsp; &nbsp; ' + player.name + ": " + player.score +"</p>")
}

Ball.prototype.move = function(){
    if (this.direction == "++"){
      this.x += this.speed;
      this.y += this.speed;
    }
    else if (this.direction == "--"){
      this.x -= this.speed;
      this.y -= this.speed;
    }
    else if (this.direction == "+-"){
      this.x += this.speed;
      this.y -= this.speed;
    }
    else if (this.direction == "-+"){
      this.x -= this.speed;
      this.y += this.speed;
    }
//collisions
    //walls
     if ((this.y - this.radius) <= 0){
      if (this.direction == "--"){this.direction = "-+"}
      else {this.direction = "++";}
    }
    else if ((this.y + this.radius) >= canvas.height ){
      if(this.direction == "++"){this.direction = "+-";}
      else {this.direction = "--";}
    }
    else if (this.x - this.radius <= 0){
      player.score += 1;
      serve(ball);
    }
    else if (this.x + this.radius >= canvas.width){
      computer.score += 1;
      serve(ball);
    }
    //paddles
        //computer
    else if ((this.x - this.radius) <= computer.paddle.width) {
            //collision
      if ((this.y + this.radius) >= computer.paddle.y && (this.y + this.radius) <= (computer.paddle.y + computer.paddle.height)){
        if (this.direction == "-+"){this.direction = "++"; ball.speed += .2;}
        else {this.direction = "+-"; ball.speed += .1;}
      }
        else if ((this.y - this.radius) >= computer.paddle.y && (this.y - this.radius) <= (computer.paddle.y + computer.paddle.height)){
          if (this.direction == "-+"){this.direction = "++";}
          else {this.direction = "+-";}
        }
    }
      //player
    else if ((this.x + this.radius) >= (canvas.width - player.paddle.width)) {
          //collision
        if ((this.y + this.radius) >= player.paddle.y && (this.y + this.radius) <= (player.paddle.y + player.paddle.height)){
          if (this.direction == "+-"){this.direction = "--";}
          else{this.direction = "-+";}
        }
        else if ((this.y - this.radius) >= player.paddle.y && (this.y - this.radius) <= (player.paddle.y + player.paddle.height)){
          if (this.direction == "+-"){this.direction = "--";}
          else{this.direction = "-+";}
        }
    }
}

Paddle.prototype.move = function(direction){
  if (direction == "up"){
    this.y -= this.speed;
  }
  else{
    this.y += this.speed;
  }

};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function serve(ball){
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
var num = getRandomInt(0,4);
  if(num <=1){ball.direction = "++"}
  else if(num <= 2){ball.direction = "--"}
  else if(num <= 3){ball.direction = "-+"}
  else if(num <= 4){ball.direction = "+-"}

}

window.onload = function(){
   serve(ball);
   animate(step);
 }

window.addEventListener('keydown', function(event){
  var key = event.keyCode;
  if (key === 38 ){
    if(player.paddle.y != 0 && player.paddle.y > 0){
      player.paddle.move("up");
    }
  }
  else if (key === 40){
    if (player.paddle.y <= (canvas.height - player.paddle.height)-player.paddle.speed){
    player.paddle.move("down")
  }
}
});

//AI
Computer.prototype.ai = function (){
  if (ball.x < (canvas.width/4) && (ball.direction == "-+" || ball.direction == "--")){
      var centerPaddle = this.paddle.y + (this.paddle.height/2);
      if (centerPaddle > ball.y && (this.paddle.y !=0 && this.paddle.y > 0)){
        this.paddle.move("up");
      }
      else if (centerPaddle < ball.y && (centerPaddle + this.paddle.height) != canvas.height ) {
        this.paddle.move("down");
      }
  }
}
