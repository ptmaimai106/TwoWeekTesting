var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;

const mod = document.getElementsByName('option');

var canvas, ctx;
var gridSize = tileSize = 20; 
var nextX = nextY = 0;
var defaultSize =tailSize = 1;
var snakeX = snakeY = 10;
var foodX = foodY = 1;
var snakeTrail = [];


function render() {
  const modGame = mod[1].checked  

  if(!modGame ){
    console.log(snakeY)
    if(snakeY <= 0 || snakeY > gridSize -1 || snakeX <= 0  || snakeX > gridSize - 1   ){
      return;
    }
  }

  snakeX += nextX;
  snakeY += nextY;

  if (snakeY < 0 ) {
    snakeY = gridSize - 1;
  }

  if (snakeY > gridSize - 1) {
    snakeY = 0;
  }

  if (snakeX < 0) {
    snakeX = gridSize - 1;
  }
  if (snakeX > gridSize - 1) {
    snakeX = 0;
  }

  if (snakeX == foodX && snakeY == foodY) {// eating

    tailSize++;
    foodX = Math.floor(Math.random() * gridSize);
    foodY = Math.floor(Math.random() * gridSize);
  }

  ctx.fillStyle = "#ddd";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for(let i=0; i<20; i++){
      for(let j=0; j<20; j++)
        ctx.strokeRect(i*20, j*20, 20, 20);
  }

  ctx.fillStyle = "black";
  for (var i = 0; i < snakeTrail.length; i++) {
    ctx.fillRect(
      snakeTrail[i].x * tileSize,
      snakeTrail[i].y * tileSize,
      tileSize,
      tileSize
    );

    if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
      tailSize = defaultSize;
    }
  }

  ctx.fillStyle = "green";
  ctx.fillRect(foodX * tileSize, foodY * tileSize, tileSize, tileSize);

  snakeTrail.push({ x: snakeX, y: snakeY });
  while (snakeTrail.length > tailSize) {
    snakeTrail.shift();
  }


}

function keyDownEvent(e) {
  switch (e.keyCode) {
    case KEY_LEFT:
      nextX = -1;
      nextY = 0;
      break;
    case KEY_UP:
      nextX = 0;
      nextY = -1;
      break;
    case KEY_RIGHT:
      nextX = 1;
      nextY = 0;
      break;
    case KEY_DOWN:
      nextX = 0;
      nextY = 1;
      break;
  }
}

window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", keyDownEvent);
    setInterval(render, 1000/5 );
};
  