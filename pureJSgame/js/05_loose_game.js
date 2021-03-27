// Escenario
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Pelota
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Paleta
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(
    paddleX,
    canvas.height - paddleHeight - 10,
    paddleWidth,
    paddleHeight
  );
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
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

// Dibujar frame
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();

  // Colision pelota
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    // lateral
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    // top
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    // si llega a la base
    if (x > paddleX && x < paddleX + paddleWidth) {
      // si x coincide rebota
      dy = -dy;
    } else {
      // si llega a la base pierde
      //   alert("GAME OVER");
      console.log("GAME OVER");
      document.location.reload();
    }
  }

  // limites de movimiento de la paleta
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
}

setInterval(draw, 10);
