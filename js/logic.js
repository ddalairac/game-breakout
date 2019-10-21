// Escenario
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Random hexa color generator
function getRandomColor() {
  var chars = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Pelota
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 1;
var dy = -1;
var color = getRandomColor();

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  // ctx.fillstyle = "#0033FF";
  // ctx.fillStroke = "#0033FF";
  // ctx.Stroke = "10";
  ctx.fill();
  ctx.closePath();
}
// Paleta
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillstyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

// Ladrillos
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (r = 0; r < brickRowCount; r++) {
    var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
    var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
    bricks[c][r] = { x: brickX, y: brickY, status: 1, color: "#fff" };
  }
}

function drawBricks() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = bricks[c][r].x;
        var brickY = bricks[c][r].y;
        var brickColor = bricks[c][r].color;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = brickColor;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

//  Permitir que el usuario controle la paleta
var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}
function paddleMovement() {
  // limites de movimiento de la paleta
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 2;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 2;
  }
}

// Colision con ladrillo
function collisionDetection() {
  // Colision ladrillo
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          color = getRandomColor();
          b.status = 0;
        }
      }
    }
  }
  // Colision pelota
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    // lateral
    dx = -dx;
    color = getRandomColor();
  }
  if (y + dy < ballRadius) {
    // top
    dy = -dy;
    color = getRandomColor();
  } else if (y + dy > canvas.height - ballRadius) {
    // si llega a la base
    if (x > paddleX && x < paddleX + paddleWidth) {
      // si x coincide rebota
      dy = -dy;
      color = getRandomColor();
    } else {
      // si llega a la base pierde
      clearInterval(interval);
      alert("GAME OVER");
      document.location.reload();
    }
  }
}

// Fin del Juego
var endGame;
function evalEndGame() {
  endGame = 0;
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      endGame += bricks[c][r].status;
    }
  }
  if (endGame == 0 && interval) {
    clearInterval(interval);
    alert("Ganaste");
    document.location.reload();
  }
}

// Dibujar frame
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawPaddle();
  drawBall();
  paddleMovement();
  collisionDetection();
  evalEndGame();

  // posicion pelota
  x = x + dx;
  y = y + dy;
}

var interval = setInterval(draw, 5);
